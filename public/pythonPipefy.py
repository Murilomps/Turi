import requests 
import pyodbc
from uuid import getnode

url = "https://api.pipefy.com/graphql" 

mac = hex(getnode())[2:]

server = 'turi.database.windows.net'
database = 'Turi'
username = 'adm-turi'
password = 'Urubu1002'
cnxn = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server +
                        ';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD=' + password)
cursor = cnxn.cursor()

pipeid = 302754046
empresa = "Riachuelo"
componente = "Memória RAM"
descricao = "A memória RAM atingiu 90% da sua capacidade"

cursor.execute("SELECT id FROM computador WHERE endereco_mac = ?", mac)
fkComp = cursor.fetchall()[0]



payload = {"query": 
"mutation{createCard(input:{ pipe_id: \"302754046\" fields_attributes:[{field_id: \"empresa\", field_value: \"Riachuelo\"}{field_id: \"componente\", field_value: \"Disco Rígido\"}{field_id: \"mais_informa_es\", field_value: \"Disco rígido atingiu 80% de sua capacidade.\"}]}){clientMutationId card {id title}}}"} 

headers = { 

    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIxNjcyNjYsImVtYWlsIjoidHVyaV9Ab3V0bG9vay5jb20uYnIiLCJhcHBsaWNhdGlvbiI6MzAwMjA1NzM5fX0.o_bj1L7j2n9rRELXyrKY2kz_P9ga6nyAkAy_5chbb3hPnknWCHaDbFhMtASg9zXuawa2DjXghQ4dQ1QyxLcj2A", 

    "Content-Type": "application/json" 

} 

response = requests.request("POST", url, json=payload, headers=headers) 
print(response.text) 

sqlNuvem = "INSERT INTO Alerta(fk_computador,componente,descricao) VALUES (?,?,?)"
valuesNuvem=[fkComp, componente,descricao]
cursor.execute(sqlNuvem,valuesNuvem)
print(cursor.rowcount,"record inserted SQL SERVER")
print("=======================")
cnxn.commit()
cnxn.close()



