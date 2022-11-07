import psutil
import time
import mysql.connector
import datetime
import platform

psutil.cpu_percent()
psutil.cpu_times_percent()
discoTotal = round(psutil.disk_usage('/').total*(2**-30),2)
memoriaTotal = round(psutil.virtual_memory().total*(2**-30),2)

while True:
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
    dataHora = datetime.datetime.now().strftime('%y/%m/%d %H:%M:%S')

# CPU
    percentualCpu = psutil.cpu_percent()
    interval = 2
    idleCpu = round(psutil.cpu_times_percent(interval=interval).idle*interval/100,2)
# DISK
    discoUsado = round(psutil.disk_usage('/').used*(2**-30),2)
# MEMORY
    vm = psutil.virtual_memory()
    print(vm)
    memoriaUsada = round(vm.used*(2**-30),2)
    memoriaDisponivel = round(vm.available*(2**-30),2) 
    memoriaLivre = round(vm.free*(2**-30),2)
    memoriaAtiva = round(vm.active*(2**-30),2)
    memoriaInativa = round(vm.inactive*(2**-30),2)
    memoriaBuffer = round(vm.buffers*(2**-30),2)
    memoriaCache = round(vm.cached*(2**-30),2)
#STATIC
    sistemaOperacional = platform.system()
    discoTotal = round(psutil.disk_usage('/').total*(2**-30),2)
    memoriaTotal = round(psutil.virtual_memory().total*(2**-30),2)
    nucleosFisicos = psutil.cpu_count(logical = False)
    nucleosLogicos = psutil.cpu_count()
    fkEmpresa = 1

# SIMULATION
    #percentualCpu2 = percentualCpu + 10 if (percentualCpu <= 90) else 100.0
    #percentualCpu3 = percentualCpu2 + 5 if (percentualCpu2 <= 95) else 100.0

    #idleCpu2 = round(idleCpu * 1.05,2) if (idleCpu * 1.05 < interval) else interval   
    #idleCpu3 = round(idleCpu * 1.05,2) if (idleCpu * 1.05 < interval) else interval   

    #discoUsado2 = discoUsado * 1.05 if (discoUsado * 1.05 < discoTotal) else discoTotal   
    #discoUsado3 = discoUsado * 1.07 if (discoUsado * 1.07 < discoTotal) else discoTotal 
    
    #memoriaUsada2 = memoriaUsada * 1.05 if (memoriaUsada * 1.05 < memoriaTotal) else memoriaTotal
    #memoriaUsada3 = memoriaUsada * 1.05 if (memoriaUsada * 1.05 < memoriaTotal) else memoriaTotal
    
    #memoriaDisponivel2 = memoriaDisponivel * 0.95
    #memoriaDisponivel3 = memoriaDisponivel * 0.90

    #memoriaLivre2 = memoriaLivre *0.95 
    #memoriaLivre3 = memoriaLivre *0.90

    #memoriaAtiva2 = memoriaAtiva *0.90  
    #memoriaAtiva3 = memoriaAtiva *0.85

    #memoriaInativa2 = memoriaInativa * 1.10
    #memoriaInativa3 = memoriaInativa * 1.15

    #memoriaBuffer2 = memoriaBuffer * 1.20 
    #memoriaBuffer3 = memoriaBuffer * 1.25

    #memoriaCache2 = memoriaCache * 0.90 
    #memoriaCache3 = memoriaCache * 0.95
    

    #maquinas = [
        #[percentualCpu,idleCpu, memoriaUsada, memoriaDisponivel, memoriaLivre, memoriaAtiva, memoriaInativa, memoriaBuffer, memoriaCache, discoUsado],
        #[percentualCpu2,idleCpu2, memoriaUsada2, memoriaDisponivel2, memoriaLivre2, memoriaAtiva2, memoriaInativa2, memoriaBuffer2, memoriaCache2, discoUsado2],
        #[percentualCpu3,idleCpu3, memoriaUsada3, memoriaDisponivel3, memoriaLivre3, memoriaAtiva3, memoriaInativa3, memoriaBuffer3, memoriaCache3, discoUsado3],
    #]
    
    cursor = con.cursor() # objeto que permite fazer interação por elementos de uma tabela lendo individualmente cada um

    while (True):
    #for index, maquina in enumerate(maquinas):
        # comando para inserir os dados das variaveis no banco
        sql = "INSERT INTO Leitura(fk_computador, data_hora,cpu_porcentagem, cpu_idle, memoria_usada, memoria_disponivel, memoria_livre, memoria_ativa, memoria_inativa, memoria_buffer, memoria_cache, disco_usado) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        #values=[(index + 1), dataHora, maquina[0], maquina[1], maquina[2], maquina[3], maquina[4], maquina[5], maquina[6], maquina[7], maquina[8], maquina[9]]
        cursor.execute(sql)
        meu_so = platform.system()
        print("SO que eu uso : ",meu_so)
        print(cursor.rowcount,"record inserted")

        con.commit()
        con.close() # esse método serve para encerrar a captura de dados e envio ao banco

        time.sleep(2.0) # discretização - reduzir tamanho do dado coletado 

        break