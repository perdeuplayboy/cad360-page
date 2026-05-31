const fs = require('fs');
const path = require('path');

const base = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const pages = [
  {
    folder: 'juiz-de-fora',
    canonical: 'https://cad360.com.br/juiz-de-fora/',
    title: 'Georreferenciamento Rural em Juiz de Fora | CAD360 Engenharia',
    description:
      'Regularize seu imóvel rural em Juiz de Fora. Georreferenciamento, SIGEF e suporte completo até o cartório.',
    logoHelper: 'Juiz de Fora e região · Zona da Mata Mineira',
    badge: 'Felipe Cremonese — 13 anos de experiência | Referência técnica em Juiz de Fora e região',
    headline:
      'Seu imóvel em Juiz de Fora está com <span class="highlight">Matrícula Irregular?</span>',
    subheadline:
      'A CAD360 resolve o georreferenciamento do início ao fim — do campo ao cartório de JF, sem retrabalho.',
    bullets: [
      [
        'gavel',
        'Imóvel travado no cartório',
        'Impossível vender, transferir ou financiar sem georreferenciamento aprovado no INCRA.',
      ],
      [
        'schedule',
        'Prazo SIGEF 2029 se aproximando',
        'Evite enfrentar profissionais com agenda cheia, cartórios mais lentos e custos maiores na regularização do imóvel.',
      ],
      [
        'cancel',
        'Serviço anterior não aprovado no órgão regulador',
        'Já contratou antes e o trabalho não foi aceito? A CAD360 resolve casos complexos com metodologia que não gera rejeição.',
      ],
    ],
    credRegion: 'Juiz de Fora e Zona da Mata Mineira',
    timelineRegion:
      'Felipe torna-se referência técnica em Juiz de Fora e na Zona da Mata — consultado por outros topógrafos para resolver casos complexos que outros não conseguem.',
    faqRegion:
      'Atendemos Juiz de Fora e toda a Zona da Mata Mineira, com raio de até 300 km. A CAD360 tem atuação nacional — para imóveis em outras regiões, avaliamos caso a caso. Informe a localização do seu imóvel no contato.',
    footerRegion: 'Juiz de Fora e região · Zona da Mata Mineira · Fundada em 2013',
  },
  {
    folder: 'barbacena',
    canonical: 'https://cad360.com.br/barbacena/',
    title: 'Georreferenciamento Rural em Barbacena | CAD360 Engenharia',
    description: 'Regularização de imóveis rurais em Barbacena e região.',
    logoHelper: 'Barbacena e Campo das Vertentes',
    badge: 'Felipe Cremonese — 13 anos de experiência | Atende Barbacena e Campo das Vertentes',
    headline:
      'Propriedade Rural em Barbacena com <span class="highlight">Documentação Pendente?</span>',
    subheadline:
      'CAD360 Engenharia atende Barbacena e região — georreferenciamento com aprovação garantida no INCRA.',
    bullets: [
      [
        'description',
        'Matrícula desatualizada',
        'Impedindo venda, herança ou crédito rural até a regularização no INCRA e cartório de Barbacena.',
      ],
      [
        'event',
        'Obrigatoriedade do SIGEF 2029',
        'O imóvel ainda não está regularizado? Quem deixar para o fim enfrentará fila, retrabalho e custos maiores.',
      ],
      [
        'account_balance',
        'Medo de contratar e o serviço travar',
        'Trabalho mal feito pode parar no cartório de Barbacena. A CAD360 entrega dados consistentes que não voltam do INCRA.',
      ],
    ],
    credRegion: 'Barbacena e Campo das Vertentes',
    timelineRegion:
      'Felipe torna-se referência técnica em Barbacena e Campo das Vertentes — consultado por outros topógrafos para resolver casos complexos que outros não conseguem.',
    faqRegion:
      'Atendemos Barbacena, Campo das Vertentes e região, com raio de até 300 km. A CAD360 tem atuação nacional — para imóveis em outras regiões, avaliamos caso a caso. Informe a localização do seu imóvel no contato.',
    footerRegion: 'Barbacena e Campo das Vertentes · Fundada em 2013',
  },
  {
    folder: 'bicas-regiao',
    canonical: 'https://cad360.com.br/bicas-regiao/',
    title: 'Georreferenciamento Rural em Bicas e Região | CAD360 Engenharia',
    description: 'Atendimento em Bicas, São João Nepomuceno, Rio Novo e Mar de Espanha.',
    logoHelper: 'Bicas · São João Nepomuceno · Rio Novo · Mar de Espanha',
    badge: 'Felipe Cremonese — 13 anos de experiência | Atende toda a região de Bicas e Sul de MG',
    headline: 'Imóvel Rural Irregular em <span class="highlight">Bicas ou Região?</span>',
    subheadline:
      'CAD360 atende Bicas, São João Nepomuceno, Rio Novo e Mar de Espanha — regularização completa com Felipe Cremonese.',
    bullets: [
      [
        'real_estate_agent',
        'Sem georreferenciamento bloqueando venda',
        'Propriedade irregular impede venda ou financiamento rural até a certificação no SIGEF.',
      ],
      [
        'schedule',
        'Prazo SIGEF 2029',
        'Quem deixar para o fim enfrentará fila e retrabalho — antecipe enquanto ainda há agenda e preços melhores.',
      ],
      [
        'compare_arrows',
        'Divisas não demarcadas',
        'Limites imprecisos geram risco de conflito com propriedades vizinhas na região de Bicas e Sul de MG.',
      ],
    ],
    credRegion: 'Bicas, Vale do Paraibuna e Sul de MG',
    timelineRegion:
      'Felipe torna-se referência técnica em Bicas e no Vale do Paraibuna — consultado por outros topógrafos para resolver casos complexos que outros não conseguem.',
    faqRegion:
      'Atendemos Bicas, São João Nepomuceno, Rio Novo, Mar de Espanha e toda a região do Vale do Paraibuna, com raio de até 300 km. Informe a localização do seu imóvel no contato.',
    footerRegion: 'Bicas · São João Nepomuceno · Rio Novo · Mar de Espanha · Fundada em 2013',
  },
];

function bulletsHtml(bullets) {
  return bullets
    .map(
      ([icon, title, text]) =>
        `                    <li><strong><span class="ms">${icon}</span>${title}</strong>${text}</li>`
    )
    .join('\n');
}

for (const p of pages) {
  let html = base;

  html = html.replace(/<title>.*?<\/title>/, `<title>${p.title}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${p.description}">`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${p.title}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${p.description}">`
  );
  html = html.replace(
    '<meta property="og:image" content="og-image.png">',
    '<meta property="og:image" content="../og-image.png">'
  );
  html = html.replace('href="/favicon.png"', 'href="../favicon.png"');
  html = html.replace(
    '<meta name="robots" content="index, follow">',
    `<meta name="robots" content="index, follow">\n    <link rel="canonical" href="${p.canonical}">`
  );
  html = html.replace(
    '<div class="logo-helper"><span class="ms label-icon">distance</span>Zona da Mata · Região Serrana do Rio</div>',
    `<div class="logo-helper"><span class="ms label-icon">distance</span>${p.logoHelper}</div>`
  );
  html = html.replace(
    '<div class="hero-pill"><span class="ms label-icon">public</span>Zona da Mata · Região Serrana · Atuação Nacional</div>',
    `<div class="hero-pill"><span class="ms label-icon">verified</span>${p.badge}</div>`
  );
  html = html.replace(
    '<h1>Regularize seu imóvel rural e garanta o <span class="highlight">direito pleno</span> sobre cada palmo da sua terra</h1>',
    `<h1>${p.headline}</h1>`
  );
  html = html.replace(
    '<p>Georreferenciamento com precisão GNSS e metodologia padronizada. Quem entrega a documentação completa recebe o trabalho no menor prazo do mercado — sem retrabalho, sem rejeição no INCRA.</p>',
    `<p>${p.subheadline}</p>`
  );

  const sideRe = /<aside class="hero-side">[\s\S]*?<ul>[\s\S]*?<\/ul>/;
  html = html.replace(
    sideRe,
    `<aside class="hero-side">
                <h3><span class="ms label-icon">warning</span>Seu imóvel precisa de regularização se...</h3>
                <ul>
${bulletsHtml(p.bullets)}
                </ul>
                `
  );

  html = html.replace('src="logo-horizontal.png"', 'src="../logo-horizontal.png"');
  html = html.replace('src="foto.png"', 'src="../foto.png"');
  html = html.replace(
    '<div class="cred-item"><strong><span class="ms label-icon">distance</span>Zona da Mata · Região Serrana</strong></div>',
    `<div class="cred-item"><strong><span class="ms label-icon">distance</span>${p.credRegion}</strong></div>`
  );
  html = html.replace(
    'Felipe torna-se referência técnica na Zona da Mata — consultado por outros topógrafos para resolver casos complexos que outros não conseguem.',
    p.timelineRegion
  );
  html = html.replace(
    /<details><summary>Vocês atendem em qual região\?<\/summary><p>[^<]*<\/p><\/details>/,
    `<details><summary>Vocês atendem em qual região?</summary><p>${p.faqRegion}</p></details>`
  );
  html = html.replace(
    '<p>Zona da Mata · Região Serrana · Atuação Nacional · Fundada em 2013</p>',
    `<p>${p.footerRegion}</p>`
  );

  const out = path.join(__dirname, p.folder, 'index.html');
  fs.writeFileSync(out, html, 'utf8');
  console.log('Created', out);
}
