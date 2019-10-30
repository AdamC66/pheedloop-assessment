import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime
scope = ["https://spreadsheets.google.com/feeds",'https://www.googleapis.com/auth/spreadsheets',"https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("creds.json", scope)
client= gspread.authorize(creds)

sheet = client.open("Test Sheet").sheet1
data = sheet.get_all_records()
row=sheet.row_values(1)
print(row)

def addRow(session, rating, first_name="anonymous", last_name=""):
    insertRow = [datetime.now().strftime("%m/%d/%Y, %H:%M:%S"), session, rating, first_name, last_name]
    sheet.insert_row(insertRow,2)