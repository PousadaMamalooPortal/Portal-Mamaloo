"""alterar_descricao_para_text

Revision ID: 2b07ad69232d
Revises: 5edbe8535c47
Create Date: 2025-05-11 00:16:06.352552

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '123456789abc'
down_revision = '5edbe8535c47'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('tab_ponto_turistico', 'descricaopontoturistico',
                  type_=sa.Text(),
                  existing_type=sa.String(length=250),
                  existing_nullable=False)


def downgrade():
    op.alter_column('tab_ponto_turistico', 'descricaopontoturistico',
                  type_=sa.String(length=250),
                  existing_type=sa.Text(),
                  existing_nullable=False)