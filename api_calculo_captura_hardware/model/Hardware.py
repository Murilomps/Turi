class Hardware:

    def __init__(self, dados_hardware, criar_simulacao = False, quantidade_maquina = 0, fator_multiplicativo = [1]):
        
        self.dados_hardware = dados_hardware;
        self.criar_simulacao = criar_simulacao;
        self.quantidade_maquina = quantidade_maquina;
        self.fator_multiplicativo = fator_multiplicativo;


    def obter_dados(self):

        maquina_base = {};
        
        for dado in self.dados_hardware:
            maquina_base.update(dado);


        if self.criar_simulacao:
            
            maquinas = [];
            maquinas.append(maquina_base);



            for i in range(self.quantidade_maquina):
                
                nova_maquina = maquina_base.copy();

                for attr, value in nova_maquina.items():
                    if(attr not in ['porcentagem_memoria_usada', 'porcentagem_swap_usada', 'porcentagem_disco_usado']):
                        nova_maquina[attr] = round(nova_maquina[attr] * self.fator_multiplicativo[i], 2); 
                           
                maquinas.append(nova_maquina);
            
            return maquinas;

        return [maquina_base]; 

        
