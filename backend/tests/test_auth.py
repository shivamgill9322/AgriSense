import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_register_and_login(client: AsyncClient):
    # 1. Register User
    reg_res = await client.post("/api/v1/auth/register", json={
        "email": "farmer1@agrisense.ai",
        "password": "mypassword123",
        "full_name": "John Farmer"
    })
    assert reg_res.status_code == 200
    assert reg_res.json()["success"] is True
    assert reg_res.json()["data"]["email"] == "farmer1@agrisense.ai"

    # 2. Login User
    login_res = await client.post("/api/v1/auth/login", json={
        "email": "farmer1@agrisense.ai",
        "password": "mypassword123"
    })
    assert login_res.status_code == 200
    token = login_res.json()["data"]["access_token"]
    assert token is not None

    # 3. Test Protected Route /me
    me_res = await client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me_res.status_code == 200
    assert me_res.json()["data"]["email"] == "farmer1@agrisense.ai"

@pytest.mark.asyncio
async def test_invalid_login(client: AsyncClient):
    login_res = await client.post("/api/v1/auth/login", json={
        "email": "nonexistent@agrisense.ai",
        "password": "wrongpassword"
    })
    assert login_res.status_code == 401
    assert login_res.json()["success"] is False
