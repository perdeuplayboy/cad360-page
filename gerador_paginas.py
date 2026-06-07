import os
import urllib.parse

cidades = [
    "Além Paraíba", "Anta", "Argirita", "Astolfo Dutra", "Barbacena", 
    "Belmiro Braga", "Bicas", "Cataguases", "Chácara", "Chiador", 
    "Comendador Levy Gasparian", "Coronel Pacheco", "Descoberto", "Dona Euzébia", 
    "Ewbank da Câmara", "Goianá", "Guarani", "Guarará", "Itamarati de Minas", 
    "Juiz de Fora", "Laranjal", "Leopoldina", "Mar de Espanha", "Maripá de Minas", 
    "Matias Barbosa", "Mercês", "Muriaé", "Paraíba do Sul", 
    "Pequeri", "Piau", "Piraúba", "Recreio", "Rio Novo", 
    "Rio Pomba", "Rochedo de Minas", "Roça Grande", "Santana do Deserto", 
    "Santo Antônio do Aventureiro", "Santos Dumont", "Sapucaia", "Senador Cortes", 
    "Simão Pereira", "São João Nepomuceno", "Tabuleiro", "Tocantins", 
    "Três Rios", "Ubá", "Volta Grande"
]

def formatar_url(cidade):
    nome_formatado = cidade.lower()
    substituicoes = {
        'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a',
        'é': 'e', 'ê': 'e', 'í': 'i',
        'ó': 'o', 'õ': 'o', 'ô': 'o', 'ú': 'u',
        'ç': 'c', ' ': '-'
    }
    for antigo, novo in substituicoes.items():
        nome_formatado = nome_formatado.replace(antigo, novo)
    return nome_formatado

def gerar_paginas():
    pasta_saida = "paginas_cidades"
    os.makedirs(pasta_saida, exist_ok=True)

    try:
        with open("template.html", "r", encoding="utf-8") as file:
            template = file.read()
    except FileNotFoundError:
        print("Erro: template.html não encontrado.")
        return

    for cidade in cidades:
        cidade_url_encoded = urllib.parse.quote(cidade)
        slug_cidade = formatar_url(cidade)
        
        html_final = template.replace("{{CIDADE}}", cidade)
        html_final = html_final.replace("{{CIDADE_ENCODED}}", cidade_url_encoded)
        html_final = html_final.replace("{{SLUG_CIDADE}}", slug_cidade)

        nome_arquivo = f"georreferenciamento-em-{slug_cidade}.html"
        caminho_arquivo = os.path.join(pasta_saida, nome_arquivo)

        with open(caminho_arquivo, "w", encoding="utf-8") as file:
            file.write(html_final)
            
        print(f"Gerado: {nome_arquivo}")

if __name__ == "__main__":
    gerar_paginas()
