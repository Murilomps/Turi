class MemoriaDao:

    @staticmethod
    def inserir_dados_memoria(cursor, dados_memoria):
        query = "INSERT INTO memoria_dinamica VALUES (null, 200, %s, %s, %s, %s, %s, %s, %s, %s)";
        cursor.execute(
            query,
            (dados_memoria["memoria_total"],
             dados_memoria["memoria_usada"],
             dados_memoria["porcentagem_memoria_usada"],
             dados_memoria["memoria_livre"], 
             dados_memoria["memoria_ativa"],
             dados_memoria["memoria_inativa"],
             dados_memoria["memoria_buffer"], 
             dados_memoria["memoria_compartilhada"])
        )

    @staticmethod
    def inserir_dados_swap(cursor, dados_swap):
        query = "INSERT INTO swap_dinamica VALUES (null, 200, %s, %s, %s, %s)"
        cursor.execute(
            query,
            (dados_swap["swap_total"],
            dados_swap["swap_usada"],
            dados_swap["porcentagem_swap_usada"],
            dados_swap["swap_livre"])
        )
