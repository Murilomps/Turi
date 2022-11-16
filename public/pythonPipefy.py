import requests 
import pyodbc
import mysql.connector

url = "https://api.pipefy.com/graphql" 

server = 'turi.database.windows.net'
database = 'Turi'
username = 'adm-turi'
password = 'Urubu1002'
cnxn = pyodbc.connect('DRIVER={OBDC Driver 18 for SQL Server};SERVER='+server +
                        ';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD=' + password)
cursor = cnxn.cursor()


payload = {"query": 
"mutation{createCard(input:{ pipe_id: \"302754046\" fields_attributes:[{field_id: \"empresa\", field_value: \"Riachuelo\"}{field_id: \"componente\", field_value: \"Memória RAM\"}{field_id: \"mais_informa_es\", field_value: \"A memória RAM atingiu 90% da sua capacidade\"}]}){clientMutationId card {id title}}}"} 

headers = { 

    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIxNjcyNjYsImVtYWlsIjoidHVyaV9Ab3V0bG9vay5jb20uYnIiLCJhcHBsaWNhdGlvbiI6MzAwMjA1NzM5fX0.o_bj1L7j2n9rRELXyrKY2kz_P9ga6nyAkAy_5chbb3hPnknWCHaDbFhMtASg9zXuawa2DjXghQ4dQ1QyxLcj2A", 

    "Content-Type": "application/json" 

} 

response = requests.request("POST", url, json=payload, headers=headers) 
print(response.text) 

