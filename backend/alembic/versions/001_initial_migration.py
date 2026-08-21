"""initial migration

Revision ID: 001_initial
Revises: 
Create Date: 2026-08-21 21:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = '001_initial'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Users Table
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('email', sa.String(255), nullable=False, unique=True, index=True),
        sa.Column('hashed_password', sa.String(255), nullable=False),
        sa.Column('full_name', sa.String(255), nullable=True),
        sa.Column('is_active', sa.Boolean(), default=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False)
    )

    # Farms Table
    op.create_table(
        'farms',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('location', sa.String(255), nullable=True),
        sa.Column('latitude', sa.Float(), nullable=True),
        sa.Column('longitude', sa.Float(), nullable=True),
        sa.Column('area', sa.Float(), nullable=True),
        sa.Column('soil_type', sa.String(100), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False)
    )

    # Crops Table
    op.create_table(
        'crops',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('farm_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('farms.id', ondelete='SET NULL'), nullable=True, index=True),
        sa.Column('crop_type', sa.String(100), nullable=False),
        sa.Column('variety', sa.String(100), nullable=True),
        sa.Column('planting_date', sa.Date(), nullable=True),
        sa.Column('growth_stage', sa.String(100), nullable=True),
        sa.Column('crop_metadata', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False)
    )

    # Soil Measurements Table
    op.create_table(
        'soil_measurements',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('crop_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('crops.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('ph', sa.Float(), nullable=False),
        sa.Column('nitrogen', sa.Float(), nullable=False),
        sa.Column('phosphorus', sa.Float(), nullable=False),
        sa.Column('potassium', sa.Float(), nullable=False),
        sa.Column('organic_carbon', sa.Float(), nullable=True),
        sa.Column('moisture', sa.Float(), nullable=False),
        sa.Column('ec_salinity', sa.Float(), nullable=True),
        sa.Column('temperature', sa.Float(), nullable=True),
        sa.Column('soil_type', sa.String(100), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False)
    )

    # Observations Table
    op.create_table(
        'observations',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('crop_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('crops.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('symptom_text', sa.Text(), nullable=True),
        sa.Column('audio_url', sa.String(500), nullable=True),
        sa.Column('transcript', sa.Text(), nullable=True),
        sa.Column('language', sa.String(50), nullable=True),
        sa.Column('extracted_symptoms_json', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False)
    )

    # Diagnoses Table
    op.create_table(
        'diagnoses',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('crop_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('crops.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('photo_url', sa.String(500), nullable=True),
        sa.Column('crop_identified', sa.String(100), nullable=False),
        sa.Column('crop_confidence', sa.Float(), nullable=False),
        sa.Column('primary_problem', sa.String(255), nullable=False),
        sa.Column('problem_category', sa.String(100), nullable=False),
        sa.Column('severity', sa.String(50), nullable=False),
        sa.Column('confidence_score', sa.Float(), nullable=False),
        sa.Column('confidence_level', sa.String(50), nullable=False),
        sa.Column('reasoning_summary', sa.Text(), nullable=True),
        sa.Column('raw_output_json', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False)
    )

    # Diagnosis Evidence Table
    op.create_table(
        'diagnosis_evidence',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('diagnosis_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('diagnoses.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('evidence_type', sa.String(100), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('source', sa.String(100), nullable=True),
        sa.Column('weight', sa.Float(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False)
    )

    # Recommendations Table
    op.create_table(
        'recommendations',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('diagnosis_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('diagnoses.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('immediate_actions_json', sa.JSON(), nullable=True),
        sa.Column('treatment_json', sa.JSON(), nullable=True),
        sa.Column('prevention_json', sa.JSON(), nullable=True),
        sa.Column('monitoring_json', sa.JSON(), nullable=True),
        sa.Column('when_to_seek_expert_json', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False)
    )

    # Followups Table
    op.create_table(
        'followups',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('diagnosis_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('diagnoses.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('photo_url', sa.String(500), nullable=True),
        sa.Column('audio_url', sa.String(500), nullable=True),
        sa.Column('transcript', sa.Text(), nullable=True),
        sa.Column('symptom_text', sa.Text(), nullable=True),
        sa.Column('status', sa.String(50), nullable=False),
        sa.Column('confidence_score', sa.Float(), nullable=False),
        sa.Column('changes_json', sa.JSON(), nullable=True),
        sa.Column('recommendation_text', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False)
    )

def downgrade() -> None:
    op.drop_table('followups')
    op.drop_table('recommendations')
    op.drop_table('diagnosis_evidence')
    op.drop_table('diagnoses')
    op.drop_table('observations')
    op.drop_table('soil_measurements')
    op.drop_table('crops')
    op.drop_table('farms')
    op.drop_table('users')
