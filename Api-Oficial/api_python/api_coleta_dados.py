import pyodbc
import psutil
import time
import mysql.connector
import datetime
import platform

psutil.cpu_percent()
discoTotal = round(psutil.disk_usage('/').total*(2**-30),2)
memoriaTotal = round(psutil.virtual_memory().total*(2**-30),2)

while True:

    server = 'turi.database.windows.net'
    database = 'Turi'
    username = 'adm-turi'
    password = 'Urubu1002'
    cnxn = pyodbc.connect('DRIVER={OBDC Driver 18 for SQL Server};SERVER='+server +
                        ';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD=' + password)
    cursor = cnxn.cursor()

    try:
        con = mysql.connector.connect(
            host='localhost', user='root', password='Zazam@#12', database='Turi') #trocar localhost para endereço de ip do docker.
        print("Conexão ao banco estabelecida!")
    except mysql.connector.Error as error:
        if error.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
            print("Erro: Database não existe")
        elif error.errno == mysql.connector.errorcode.ER_ACCESS_DENIED_ERROR:
            print("Erro: Nome ou senha incorretos")
        else:
            print(error)
    dataHora = datetime.datetime.now().strftime('%Y/%m/%d %H:%M:%S')

# CPU
    percentualCpu = psutil.cpu_percent()
    cpuLogicos = psutil.cpu_count()
    cpuFisicos = psutil.cpu_count(logical=False)
    
# DISK
    discoUsado = round(psutil.disk_usage('/').used*(2**-30),2)
    
# MEMORY
    vm = psutil.virtual_memory()
    memoriaUsada = round(vm.used*(2**-30),2)
    memoriaDisponivel = round(vm.available*(2**-30),2) 

    fkComputador = 1
    fkEmpresa = 1

    meu_so = platform.system()
    

# SIMULATION
    # percentualCpu2 = percentualCpu + 10 if (percentualCpu <= 90) else 100.0
    # percentualCpu3 = percentualCpu2 + 5 if (percentualCpu2 <= 95) else 100.0   

    # discoUsado2 = discoUsado * 1.05 if (discoUsado * 1.05 < discoTotal) else discoTotal   
    # discoUsado3 = discoUsado * 1.07 if (discoUsado * 1.07 < discoTotal) else discoTotal 
    
    # memoriaUsada2 = memoriaUsada * 1.05 if (memoriaUsada * 1.05 < memoriaTotal) else memoriaTotal
    # memoriaUsada3 = memoriaUsada * 1.05 if (memoriaUsada * 1.05 < memoriaTotal) else memoriaTotal
    
    # memoriaDisponivel2 = memoriaDisponivel * 0.95
    # memoriaDisponivel3 = memoriaDisponivel * 0.90

    

    # maquinas = [
    #     [percentualCpu, discoUsado, memoriaUsada, memoriaDisponivel],
    #     [percentualCpu2, discoUsado2, memoriaUsada2, memoriaDisponivel2],
    #     [percentualCpu3, discoUsado3, memoriaUsada3, memoriaDisponivel3],
    # ]
    
    cursorLocal = con.cursor() # objeto que permite fazer interação por elementos de uma tabela lendo individualmente cada um


    while True:
        # comando para inserir os dados das variaveis no banco LOCAL
        sql = "INSERT INTO Leitura(fk_computador, data_hora,cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel) VALUES (%s,%s,%s,%s,%s,%s)"
        sql2 = "INSERT INTO computador(fk_empresa, memoria_total, disco_total, sistema_operacional, cpu_nucleos_logicos, cpu_nucleos_fisicos) VALUES (%s,%s,%s,%s,%s,%s)"
        values=[fkComputador, dataHora, percentualCpu, discoUsado, memoriaUsada, memoriaDisponivel]
        values2=[fkEmpresa, memoriaTotal, discoTotal, meu_so, cpuLogicos, cpuFisicos]
        cursorLocal.execute(sql,values)
        cursorLocal.execute(sql2,values2)
        cursorLocal.execute(sql,values)
        print("SO que eu uso : ",meu_so)
        print(cursorLocal.rowcount,"record inserted MYSQL LOCAL")
        print("=======================")
        con.commit()

        # comando para inserir os dados das variaveis no banco NUVEM
        sqlNuvem = "INSERT INTO Leitura(fk_computador, data_hora,cpu_porcentagem, disco_usado, memoria_usada, memoria_disponivel) VALUES (?,?,?,?,?,?)"
        valuesNuvem=[fkComputador, dataHora, percentualCpu, discoUsado, memoriaUsada, memoriaDisponivel]
        cursor.execute(sqlNuvem,valuesNuvem)
        sqlNuvem2 = "INSERT INTO computador(fk_empresa, memoria_total, disco_total, sistema_operacional, cpu_nucleos_logicos, cpu_nucleos_fisicos) VALUES (?,?,?,?,?,?)"
        valuesNuvem2=[fkEmpresa, memoriaTotal, discoTotal, meu_so, cpuLogicos, cpuFisicos]
        cursor.execute(sqlNuvem2,valuesNuvem2)
        print("SO que eu uso : ",meu_so)
        print(cursor.rowcount,"record inserted SQL SERVER")
        print("=======================")
        cnxn.commit()
        time.sleep(2.0) # discretização - reduzir tamanho do dado coletado 