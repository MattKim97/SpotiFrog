from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import InputRequired, Length
from flask_wtf.file import FileField, FileAllowed
from .utils import ALLOWED_EXTENSIONS


class AlbumForm(FlaskForm):
    name=StringField(validators=[InputRequired(), Length(max=100)])
    albumCover=FileField(validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    releaseDate=DateField(validators=[InputRequired()])
