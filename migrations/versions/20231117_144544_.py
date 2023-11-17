"""empty message

Revision ID: 9ee84b509196
Revises: 
Create Date: 2023-11-17 14:45:44.287143

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9ee84b509196'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashedPassword', sa.String(length=255), nullable=False),
    sa.Column('profilePictureUrl', sa.String(length=255), nullable=True),
    sa.Column('lastPageUrl', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('albums',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('albumCover', sa.String(length=255), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('releaseDate', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('playlistCover', sa.String(length=255), nullable=True),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('albumId', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('mp3', sa.String(length=255), nullable=False),
    sa.Column('uploadedAt', sa.DateTime(), nullable=True),
    sa.Column('playtimeLength', sa.Integer(), nullable=False),
    sa.Column('albumTrackNumber', sa.Integer(), nullable=True),
    sa.Column('lyrics', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['albumId'], ['albums.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('likes',
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('songId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['songId'], ['songs.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('userId', 'songId')
    )
    op.create_table('playlistsSongs',
    sa.Column('playlistId', sa.Integer(), nullable=False),
    sa.Column('songId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['playlistId'], ['playlists.id'], ),
    sa.ForeignKeyConstraint(['songId'], ['songs.id'], ),
    sa.PrimaryKeyConstraint('playlistId', 'songId')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('playlistsSongs')
    op.drop_table('likes')
    op.drop_table('songs')
    op.drop_table('playlists')
    op.drop_table('albums')
    op.drop_table('users')
    # ### end Alembic commands ###
