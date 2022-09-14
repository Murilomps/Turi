#BancoMySql
from controller.HardwareController import HardwareController
from database.config import *;

#Cpu
from controller.CpuController import *;

#Memória
from controller.MemoriaController import *;

#Disco
from controller.DiscoController import *

#Hardware
from controller.HardwareController import *;


class App:

    informacao_hardware = '';


    @staticmethod 
    def perguntar_usuario():
        print("Digite o número do que deseja acessar\n");
        print(
            "(1) Cpu\n"+
            "(2) Memória\n"+
            "(3) Disco\n"
            "(4) Todas"
        );
        resposta_usuario = int(input("Resposta: "));

        if resposta_usuario not in [1,2,3,4]:
            raise Exception;
        
        return resposta_usuario;

    @staticmethod 
    def perguntar_simular_dados():
        
        dados=[Cpu().buscar_dados_media(), Memoria().buscar_todos_dados(), Disco().buscar_dados_disco()]

        print("\n\nDeseja simular dados? S/n");
        resposta_simulacao = input("Resposta: ").lower();

        if(resposta_simulacao not in ['s', 'n']):
            raise Exception;
        
        if(resposta_simulacao == 'n'):
            return Hardware(dados);
        
        print("\n\nInforme a quantidade de máquinas que deseja simular");
        quantidade_maquinas = int(input("Resposta: "));

        fator_multiplicativo = [];

        for i in range(quantidade_maquinas):
            multiplicacao = float(input(f"\n\nFator multiplicativo da máquina {i+1}: "))
            fator_multiplicativo.append(multiplicacao);
        
        return Hardware(
            dados,
            True,
            quantidade_maquinas,
            fator_multiplicativo
        )

    def escolher_componente_hardware(self):
        
        try : 
            pergunta_usuario = App.perguntar_usuario();

            if(pergunta_usuario == 1):
                self.informacao_hardware = CpuController(Cpu(), CpuView(), BancoMySql(), CpuDao());

            elif(pergunta_usuario == 2):
                self.informacao_hardware = MemoriaController(Memoria(), MemoriaView(), BancoMySql(), MemoriaDao());

            elif(pergunta_usuario == 3):
                self.informacao_hardware = DiscoController(Disco(), DiscoView(), BancoMySql(), DiscoDao())
            
            else:
                self.informacao_hardware = HardwareController(self.perguntar_simular_dados(), HardwareView(), BancoMySql(),[CpuDao(), DiscoDao(), MemoriaDao()]);


        
        except:
            print("Escolha inválida");

        


    
    def iniciar_programa(self):
        self.escolher_componente_hardware();
        try:
            self.informacao_hardware.iniciar();
        
        except:
            print("Não foi possível iniciar o programa");

programa = App();
programa.iniciar_programa();
