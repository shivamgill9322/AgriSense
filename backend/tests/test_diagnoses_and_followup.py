import io
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_full_multimodal_diagnosis_and_followup(client: AsyncClient, auth_headers: dict):
    # 1. Create Crop
    crop_res = await client.post("/api/v1/crops", json={
        "crop_type": "Wheat",
        "variety": "Durum",
        "growth_stage": "Flowering"
    }, headers=auth_headers)
    crop_id = crop_res.json()["data"]["id"]

    # 2. Upload Dummy Image
    dummy_img = io.BytesIO(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4")
    files = {"photo": ("leaf.png", dummy_img, "image/png")}
    data = {
        "symptom_text": "The leaf margins show yellow spots for 3 days.",
        "ph": "6.2",
        "nitrogen": "25.0",
        "phosphorus": "30.0",
        "potassium": "40.0",
        "moisture": "50.0"
    }

    diag_res = await client.post(
        f"/api/v1/crops/{crop_id}/diagnose",
        data=data,
        files=files,
        headers=auth_headers
    )
    assert diag_res.status_code == 200
    diag_data = diag_res.json()["data"]
    assert diag_data["crop_identified"] is not None
    assert diag_data["primary_problem"] is not None
    assert diag_data["confidence_score"] > 0
    diagnosis_id = diag_data["id"]

    # 3. Perform Follow-up Inspection
    followup_img = io.BytesIO(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4")
    followup_files = {"photo": ("followup_leaf.png", followup_img, "image/png")}
    followup_data = {
        "symptom_text": "Symptoms have decreased significantly after applying treatment."
    }

    fol_res = await client.post(
        f"/api/v1/diagnoses/{diagnosis_id}/followup",
        data=followup_data,
        files=followup_files,
        headers=auth_headers
    )
    assert fol_res.status_code == 200
    fol_json = fol_res.json()["data"]
    assert fol_json["status"] in ["improved", "significantly_improved", "unchanged", "worsened", "new_problem", "uncertain"]
    assert fol_json["confidence"] > 0
