import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_farm_and_crop_crud(client: AsyncClient, auth_headers: dict):
    # 1. Create Farm
    farm_res = await client.post("/api/v1/farms", json={
        "name": "Green Valley Acres",
        "location": "California, USA",
        "area": 25.5,
        "soil_type": "Loamy"
    }, headers=auth_headers)
    assert farm_res.status_code == 200
    farm_id = farm_res.json()["data"]["id"]

    # 2. List Farms
    list_farms = await client.get("/api/v1/farms", headers=auth_headers)
    assert len(list_farms.json()["data"]) == 1

    # 3. Create Crop under Farm
    crop_res = await client.post("/api/v1/crops", json={
        "crop_type": "Tomato",
        "farm_id": farm_id,
        "variety": "Roma",
        "growth_stage": "Vegetative"
    }, headers=auth_headers)
    assert crop_res.status_code == 200
    crop_id = crop_res.json()["data"]["id"]

    # 4. Save Soil Data for Crop
    soil_res = await client.post(f"/api/v1/crops/{crop_id}/soil", json={
        "ph": 6.5,
        "nitrogen": 45.0,
        "phosphorus": 30.0,
        "potassium": 40.0,
        "moisture": 55.0,
        "soil_type": "Loamy"
    }, headers=auth_headers)
    assert soil_res.status_code == 200
    assert soil_res.json()["data"]["ph"] == 6.5
