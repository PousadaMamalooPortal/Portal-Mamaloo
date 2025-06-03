# app/seeds.py
from sqlalchemy.exc import IntegrityError
from .models import Base, PontoTuristico
from .database import engine, SessionLocal

def criar_dados_iniciais():
    # Cria as tabelas se não existirem
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Verifica se já existem dados para não duplicar
        if db.query(PontoTuristico).count() == 0:
            dados_iniciais = [
                PontoTuristico(
                    nomepontoturistico="Piscinas Naturais de Pajuçara",
                    descricaopontoturistico="Imagine um lugar onde águas cristalinas se encontram com o céu azul, e você pode nadar em meio a peixes coloridos em um cenário natural deslumbrante. Esse lugar existe e se chama Piscinas Naturais de Pajuçara, em Maceió, Alagoas. A poucos metros da costa, essas piscinas formadas por recifes de corais oferecem uma experiência única de contato com a natureza. Em um passeio de barco, você pode explorar essas águas calmas e transparentes, mergulhar em um mundo subaquático encantador e relaxar em um dos cenários mais paradisíacos do Brasil.",
                    linkpontoturistico="./assets/piscinas_naturais_pajucara.jpg"
                ),
                PontoTuristico(
                    nomepontoturistico="Praia de Ponta Verde",
                    descricaopontoturistico="Se você busca um cenário deslumbrante, com águas calmas, coqueiros à beira-mar e uma vista de tirar o fôlego, a Praia de Ponta Verde é o destino perfeito. Localizada no coração de Maceió, Alagoas, essa praia é um convite ao relaxamento e à diversão. Suas águas verdes e cristalinas são ideais para um banho revigorante, enquanto a orla oferece uma infraestrutura completa com bares, restaurantes e quiosques, garantindo conforto para os visitantes. Além disso, o visual das falésias e o pôr do sol espetacular fazem de Ponta Verde um lugar imperdível para quem deseja vivenciar o melhor da natureza e da cultura local.",
                    linkpontoturistico="./assets/praia_ponta_verde.jpg"
                ),
                PontoTuristico(
                    nomepontoturistico="Marco dos Corais",
                    descricaopontoturistico="O Marco dos Corais é uma das atrações mais emblemáticas de Maceió, oferecendo aos turistas uma vista espetacular da rica vida marinha do litoral alagoano. Localizado na Praia do Francês, o monumento é um ponto de referência que simboliza a importância dos recifes de corais para o ecossistema local. De lá, é possível contemplar uma imersão completa na natureza, com águas cristalinas e uma paisagem única que mistura o azul do mar com o verde das algas e a diversidade de peixes coloridos.",
                    linkpontoturistico="./assets/marco_dos_corais.jpg"
                ),
                PontoTuristico(
                    nomepontoturistico="Pavilhão do Artesanato",
                    descricaopontoturistico="O Pavilhão do Artesanato de Maceió é o lugar ideal para quem deseja levar para casa um pedacinho da cultura e arte local. Localizado na região da Praia do Pajuçara, o espaço reúne uma grande variedade de produtos feitos por artesãos alagoanos, como rendas, peças em madeira, cerâmica, bordados e acessórios que refletem a riqueza e a criatividade do povo nordestino. Além de ser um ótimo local para comprar souvenirs autênticos, o Pavilhão oferece uma experiência imersiva, onde visitantes podem conhecer o trabalho dos artesãos e até observar o processo de fabricação de algumas peças.",
                    linkpontoturistico="./assets/pavilhao_artesanato.jpg"
                ),
                PontoTuristico(
                    nomepontoturistico="Museu Théo Brandão",
                    descricaopontoturistico="O Museu Théo Brandão é um verdadeiro tesouro cultural de Maceió, perfeito para quem deseja mergulhar na história e nas tradições de Alagoas. Localizado no centro da cidade, o museu abriga um acervo riquíssimo que retrata a cultura popular nordestina, com exposições de arte, objetos históricos, fotografias e artefatos que narram a evolução da sociedade alagoana. Fundado em homenagem ao antropólogo e fotógrafo Théo Brandão, o espaço oferece uma visão única sobre o folclore, as manifestações culturais e a vida cotidiana da região.",
                    linkpontoturistico="./assets/museu_theo_brandao.jpg"
                ),
            ]
            
            try:
                db.add_all(dados_iniciais)
                db.commit()
                print("✅ Dados iniciais criados com sucesso!")
            except IntegrityError as e:
                db.rollback()
                print(f"⚠️ Erro ao criar dados iniciais: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    criar_dados_iniciais()