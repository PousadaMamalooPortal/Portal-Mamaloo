import psycopg2
from psycopg2 import OperationalError

def testar_conexao():
    conexao_params = {
        'host': 'ep-proud-leaf-a8pkwm2n.eastus2.azure.neon.tech',
        'database': 'meubanco',
        'user': 'meubanco_owner',
        'password': 'npg_F8GNfRqg9yXv',
        'port': '5432',
        'sslmode': 'require'  # Adicionando SSL
    }
    
    try:
        conexao = psycopg2.connect(**conexao_params)
        cursor = conexao.cursor()
        cursor.execute("SELECT version();")
        versao = cursor.fetchone()
        
        print("✅ Conexão bem-sucedida!")
        print(f"Versão do PostgreSQL: {versao[0]}")
        
        cursor.close()
        conexao.close()
        
    except OperationalError as e:
        print(f"❌ Falha na conexão: {e}")
        print("\nSugestões para resolver:")
        print("1. Verifique se o servidor Neon está ativo")
        print("2. Confira as configurações de rede/firewall")
        print("3. No painel do Neon, verifique:")
        print("   - Se o banco está ativo")
        print("   - Se seu IP está liberado")
        print("4. Tente conectar via psql para testar:")
        print(f"   psql -h ep-proud-leaf-a8pkwm2n.eastus2.azure.neon.tech -U meubanco_owner -d meubanco")

if __name__ == "__main__":
    print("Testando conexão com o banco de dados...")
    testar_conexao()