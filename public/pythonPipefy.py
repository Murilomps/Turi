import requests 
import pyodbc

url = "https://api.pipefy.com/graphql" 

server = 'turi.database.windows.net'
database = 'Turi'
username = 'adm-turi'
password = 'Urubu1002'
cnxn = pyodbc.connect('DRIVER={OBDC Driver 18 for SQL Server};SERVER='+server +
                        ';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD=' + password)
cursor = cnxn.cursor()

pipeid = 302754046
empresa = "Riachuelo"
componente = "Memória RAM"
descricao = "A memória RAM atingiu 90% da sua capacidade"

cursor.execute("SELECT id FROM computador WHERE fk_computador = computador.id")
fkComp = cursor.fetchall()


payload = {"query": 
"mutation{createCard(input:{ pipe_id: \"pipeid\" fields_attributes:[{field_id: \"empresa\", field_value: \"empresa\"}{field_id: \"componente\", field_value: \"componente\"}{field_id: \"mais_informa_es\", field_value: \"descricao\"}]}){clientMutationId card {id title}}}"} 

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



