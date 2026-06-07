import os
import re

from PIL import Image, ImageOps

IMAGENS_GALERIA = [
    "campo-levantamento-01.png",
    "IMG_20250320_141213884.jpg",
    "trabalhos-03-obras.jpeg",
    "IMG_20250516_155640436.jpg",
    "PXL_20250818_115339415.jpg",
    "campo-atendimento.jpeg",
]

LARGURA_THUMB = 800
QUALIDADE_THUMB = 80
LARGURA_HD = 1920
QUALIDADE_HD = 85


def nome_base_arquivo(arquivo_original):
    nome_base, _ = os.path.splitext(arquivo_original)
    return nome_base


def nome_thumbnail(arquivo_original):
    return f"{nome_base_arquivo(arquivo_original)}-thumb.webp"


def nome_hd(arquivo_original):
    return f"{nome_base_arquivo(arquivo_original)}-hd.webp"


def carregar_imagem(caminho_entrada):
    with Image.open(caminho_entrada) as imagem:
        imagem = ImageOps.exif_transpose(imagem)
        return imagem.convert("RGB")


def redimensionar(imagem, largura_maxima):
    largura, altura = imagem.size
    if largura <= largura_maxima:
        return imagem.copy()

    nova_altura = round(altura * (largura_maxima / largura))
    return imagem.resize((largura_maxima, nova_altura), Image.Resampling.LANCZOS)


def salvar_webp(imagem, caminho_saida, qualidade):
    imagem.save(
        caminho_saida,
        format="WEBP",
        quality=qualidade,
        method=6,
    )


def gerar_variantes(imagem_base, pasta_galeria, arquivo):
    caminho_thumb = os.path.join(pasta_galeria, nome_thumbnail(arquivo))
    caminho_hd = os.path.join(pasta_galeria, nome_hd(arquivo))

    salvar_webp(
        redimensionar(imagem_base, LARGURA_THUMB),
        caminho_thumb,
        QUALIDADE_THUMB,
    )
    salvar_webp(
        redimensionar(imagem_base, LARGURA_HD),
        caminho_hd,
        QUALIDADE_HD,
    )

    tamanho_thumb_kb = os.path.getsize(caminho_thumb) / 1024
    tamanho_hd_kb = os.path.getsize(caminho_hd) / 1024
    print(f"Gerado: {nome_thumbnail(arquivo)} ({tamanho_thumb_kb:.1f} KB)")
    print(f"Gerado: {nome_hd(arquivo)} ({tamanho_hd_kb:.1f} KB)")


def atualizar_template(raiz_projeto):
    arquivos_html = ["template.html", "index.html"]

    for nome_arquivo in arquivos_html:
        caminho_html = os.path.join(raiz_projeto, nome_arquivo)

        if not os.path.isfile(caminho_html):
            print(f"Aviso: {nome_arquivo} não encontrado. Pulando atualização.")
            continue

        with open(caminho_html, "r", encoding="utf-8") as file:
            conteudo = file.read()

        for arquivo in IMAGENS_GALERIA:
            nome_base = nome_base_arquivo(arquivo)
            hd_src = f'/galeria/{nome_base}-hd.webp'
            padrao = rf'data-full-src="/galeria/{re.escape(arquivo)}"'
            substituicao = f'data-full-src="{hd_src}"'
            conteudo, total = re.subn(padrao, substituicao, conteudo)
            if total == 0 and f'data-full-src="{hd_src}"' not in conteudo:
                print(f"Aviso: data-full-src não encontrado para {arquivo} em {nome_arquivo}")

        with open(caminho_html, "w", encoding="utf-8") as file:
            file.write(conteudo)

        print(f"Atualizado: {nome_arquivo} (data-full-src -> versões -hd.webp)")


def otimizar_imagens():
    raiz_projeto = os.path.dirname(os.path.abspath(__file__))
    pasta_galeria = os.path.join(raiz_projeto, "galeria")
    os.makedirs(pasta_galeria, exist_ok=True)

    for arquivo in IMAGENS_GALERIA:
        caminho_entrada = os.path.join(pasta_galeria, arquivo)

        if not os.path.isfile(caminho_entrada):
            print(f"Erro: arquivo não encontrado -> {caminho_entrada}")
            continue

        imagem_base = carregar_imagem(caminho_entrada)
        tamanho_original_kb = os.path.getsize(caminho_entrada) / 1024
        print(f"\nProcessando: {arquivo} ({tamanho_original_kb:.1f} KB)")
        gerar_variantes(imagem_base, pasta_galeria, arquivo)

    atualizar_template(raiz_projeto)


if __name__ == "__main__":
    otimizar_imagens()
