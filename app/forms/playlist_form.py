from flask_wtf import FlaskForm
from wtforms import StringField , DateField
from wtforms.validators import InputRequired, Length
from flask_wtf.file import FileField, FileAllowed
from .utils import ALLOWED_EXTENSIONS


class PlayListForm(FlaskForm):
    name=StringField(validators=[InputRequired(), Length(max=100)])
    playlistCover=FileField(validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    description=StringField(validators=[Length(max=255)])
