# Generated by Django 2.2.6 on 2019-10-29 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('presentations', '0002_auto_20191029_1540'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='rating',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
