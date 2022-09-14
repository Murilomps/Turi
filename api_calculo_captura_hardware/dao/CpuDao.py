class CpuDao:
    
    @staticmethod
    def inserir_media_cpu(cursor, dados_cpu):
        query = "INSERT INTO cpu_dinamica VALUES (null, 200, %s, %s, %s, %s, %s)";
        
        cursor.execute(
            query, 
            (dados_cpu['user'], 
             dados_cpu['system'], 
             dados_cpu['idle'],
             dados_cpu['iowait'],
             dados_cpu['freq'])
        )

    
    
        
