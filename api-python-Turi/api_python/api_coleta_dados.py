import pyodbc 
import psutil
import time
import mysql.connector
import datetime
import platform
from uuid import getnode

# print(psutil.sensors_temperatures())

psutil.cpu_percent()
discoTotal = round(psutil.disk_usage('/').total*(2**-30),2)
memoriaTotal = round(psutil.virtual_memory().total*(2**-30),2)
cpuLogicos = psutil.cpu_count()
cpuFisicos = psutil.cpu_count(logical=False)
meu_so = platform.system()
mac = hex(getnode())[2:]
fkEmpresa = 1

server = 'turi.database.windows.net'
database = 'Turi'
username = 'adm-turi'
password = 'Urubu1002'
cnxn = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server +
                    ';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD=' + password)
cursor = cnxn.cursor()

try:
    con = mysql.connector.connect(
        host='localhost', user='root', password='Zazam@#12', database='Turi') # coloque a senha do seu mysql
                       # o localhost pode ser o ip do seu docker, atenção
    print("Conexão ao banco estabelecida!")
except mysql.connector.Error as error:
    if error.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
        print("Erro: Database não existe")
    elif error.errno == mysql.connector.errorcode.ER_ACCESS_DENIED_ERROR:
        print("Erro: Nome ou senha incorretos")
    else:
        print(error)
cursorLocal = con.cursor()

# LOCAL insere em computador
cursorLocal.execute("SELECT (id) FROM computador WHERE endereco_mac = %s", [mac])
idCompLocal = cursorLocal.fetchall()
print(cursorLocal.rowcount)
if (cursorLocal.rowcount == 0):
    con.commit()
    sql = "INSERT INTO computador(fk_empresa, memoria_total, disco_total, sistema_operacional, cpu_nucleos_logicos, cpu_nucleos_fisicos, endereco_mac) VALUES (%s,%s,%s,%s,%s,%s,%s)"
    values=[fkEmpresa, memoriaTotal, discoTotal, meu_so, cpuLogicos, cpuFisicos, mac]
    cursorLocal.execute(sql,values)
    print(cursorLocal.rowcount,"record inserted MYSQL LOCAL")
    con.commit()
else:
    print("Dado repetido Local")

cursorLocal.execute("SELECT (id) FROM computador WHERE endereco_mac = %s", [mac])
idCompLocal = cursorLocal.fetchall()[0][0]

print(idCompLocal)

con.commit()

# NUVEM insere em computador
cursor.execute("SELECT id FROM computador WHERE endereco_mac = ?", mac)
idComp = cursor.fetchall()
print(cursor.rowcount)
if (cursor.rowcount == 0):
    # print("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
   
    cnxn.commit()
    sqlNuvem = "INSERT INTO computador(fk_empresa, memoria_total, disco_total, sistema_operacional, cpu_nucleos_logicos, cpu_nucleos_fisicos, endereco_mac) VALUES (?,?,?,?,?,?,?)"
    valuesNuvem=[fkEmpresa, memoriaTotal, discoTotal, meu_so, cpuLogicos, cpuFisicos, mac]
    cursor.execute(sqlNuvem,valuesNuvem)
    print(cursor.rowcount,"record inserted SQL SERVER")
    cnxn.commit()
    cursor.execute("SELECT id FROM computador WHERE endereco_mac = ?", mac)
else: 
    print("Dado repetido")

cursor.execute("SELECT id FROM computador WHERE endereco_mac = ?", mac)
idComp = cursor.fetchall()[0][0]

print(idComp)

cnxn.commit()

con.close()
cnxn.close()

while True:

    server = 'turi.database.windows.net'
    database = 'Turi'
    username = 'adm-turi'
    password = 'Urubu1002'
    cnxn = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server +
                        ';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD=' + password)
    cursor = cnxn.cursor()

    try:
        con = mysql.connector.connect(
            host='localhost', user='root', password='Zazam@#12', database='Turi') # coloque a senha do seu mysql
        print("Conexão ao banco estabelecida!")                          # o localhost pode ser o ip do seu docker, atenção
    except mysql.connector.Error as error:
        if error.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
            print("Erro: Database não existe")
        elif error.errno == mysql.connector.errorcode.ER_ACCESS_DENIED_ERROR:
            print("Erro: Nome ou senha incorretos")
        else:
            print(error)
    cursorLocal = con.cursor()

    dataHora = datetime.datetime.now().strftime('%Y/%m/%d %H:%M:%S')

# CPU
    percentualCpu = psutil.cpu_percent()
    
# DISK
    discoUsado = round(psutil.disk_usage('/').used*(2**-30),2)

# MEMORY
    vm = psutil.virtual_memory()
    memoriaUsada = round(vm.used*(2**-30),2)
    memoriaDisponivel = round(vm.available*(2**-30),2) 
    
    
    # comando para inserir os dados das variaveis no banco LOCAL
    sql2 = "INSERT INTO Leitura(fk_computador, data_hora,cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel) VALUES (%s,%s,%s,%s,%s,%s)"
    values2=[idCompLocal, dataHora, percentualCpu, discoUsado, memoriaUsada, memoriaDisponivel]
    cursorLocal.execute(sql2,values2)
    print(cursorLocal.rowcount,"record inserted MYSQL LOCAL")
    print("=======================")
    con.commit()

    # comando para inserir os dados das variaveis no banco NUVEM
    sqlNuvem2 = "INSERT INTO Leitura(fk_computador, data_hora,cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel) VALUES (?,?,?,?,?,?)"
    valuesNuvem2=[idComp, dataHora, percentualCpu, discoUsado, memoriaUsada, memoriaDisponivel]
    cursor.execute(sqlNuvem2,valuesNuvem2)
    print(cursor.rowcount,"record inserted SQL SERVER")
    print("=======================")
    cnxn.commit()

    con.close()
    cnxn.close()
    time.sleep(2.0) # discretização - reduzir tamanho do dado coletado 