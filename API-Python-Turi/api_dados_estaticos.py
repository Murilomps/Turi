# Lembrete: Dados da empresa (para colocar em fkEmpresa futuramente) precisam da tela "Cadastro de Servidores" enviando dados da empresa para este arquivo

import psutil
import mysql.connector
import platform

try:
    con = mysql.connector.connect(
        host='localhost', user='root', password='sovocl1n', database='Turi')
    print("Conexão ao banco estabelecida!")
except mysql.connector.Error as error:
    if error.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
        print("Erro: Database não existe")
    elif error.errno == mysql.connector.errorcode.ER_ACCESS_DENIED_ERROR:
        print("Erro: Nome ou senha incorretos")
    else:
        print(error)

sistemaOperacional = platform.system()
discoTotal = round(psutil.disk_usage('/').total*(2**-30),2)
memoriaTotal = round(psutil.virtual_memory().total*(2**-30),2)
nucleosFisicos = psutil.cpu_count(logical = False)
nucleosLogicos = psutil.cpu_count()
fkEmpresa = 1
cursor = con.cursor()
    
for index in range(3):
    sql = "INSERT INTO computador(id, fkEmpresa, sistema_operacional, disco_total, cpu_nucleos_logicos, cpu_nucleos_fisicos, memoria_total) VALUES (%s,%s,%s,%s,%s,%s,%s)"
    values=[(index + 1),fkEmpresa,sistemaOperacional,discoTotal, nucleosLogicos,nucleosFisicos, memoriaTotal]
    cursor.execute(sql,values)
    print(cursor.rowcount,"record inserted")

con.commit()
con.close()
