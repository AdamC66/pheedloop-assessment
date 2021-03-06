# Generated by Django 2.2.6 on 2019-10-31 15:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('presentations', '0005_auto_20191030_1710'),
    ]

    operations = [
        migrations.AddField(
            model_name='speaker',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='speakers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='session',
            name='rating',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]
