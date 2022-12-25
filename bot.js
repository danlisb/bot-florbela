let twit = require('twit'); // necessário para usar os comandos de acesso ao twitter
const cron = require('node-cron'); // biblioteca para agendamentos

// inicialização do acesso ao twitter, passando a configuração das chaves
let Twitter = new twit({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
});

// definição do nosso array com as frases desejadas, cada linha é um valor do array
let arr = [
    'Eu não sou boa nem quero sê-lo, contento-me em desprezar quase todos, odiar alguns, estimar raros e amar um.',
    'Eu quero amar, amar perdidamente. Amar só por amar.',
    'Amo-te tanto. E nunca te beijei... E nesse beijo, amor, que eu não te dei, guardo os versos mais lindos que te fiz.',
    'Olha para mim, amor, olha para mim;',
    'Meus olhos andam doidos por te olhar!',
    'Cega-me com o brilho de teus olhos.',
    'Que cega ando eu há muito por te amar.',
    'Quantas vezes? Amor, já te esqueci, para mais doidamente me lembrar, mais doidamente me lembrar de ti.',
    'Ama-se quem se ama e não quem se quer amar.',
    'Eu quero amar, amar, amar só por amar alguém...',
    'Se alguém disser que pode amar uma pessoa a vida inteira, é porque mente!',
    'A ironia é a expressão mais perfeita do pensamento.',
    'A vida é sempre a mesma para todos: rede de ilusões e desenganos. O quadro é único, a moldura é que é diferente.',
    'Se penetrássemos o sentido da vida seríamos menos miseráveis.',
    'Sou talvez a visão que alguém sonhou. Alguém que veio ao mundo prá me ver. E que nunca na vida me encontrou.',
    'Sou uma céptica que crê em tudo, uma desiludida cheia de ilusões...',
    'Uma revoltada que aceita, sorridente, todo o mal da vida, uma indiferente a transbordar de ternura.',
    'Não és sequer a razão de meu viver, pois que tu és já toda a minha vida.',
    'Há uma primavera em cada vida: é preciso cantá-la assim florida, pois se Deus nos deu voz, foi para cantar!',
    'E se um dia hei-de ser pó, cinza e nada que seja a minha noite uma alvorada, que me saiba perder, para me encontrar.',
    'Estou cansada, cada vez mais incompreendida e insatisfeita comigo, com a vida e com os outros.',
    'Diz-me, porque não nasci igual aos outros, sem dúvidas, sem desejos de impossível?',
    'Trago no olhar visões extraordinárias, de coisas que abracei de olhos fechados...',
    'Tão pobres somos que as mesmas palavras nos servem para exprimir a mentira e a verdade.',
    'Gosto da noite imensa, triste, preta, como esta estranha borboleta que eu sinto sempre a voltejar em mim!...',
    'Quem me dera encontrar o verso puro, o verso altivo e forte, estranho e duro, que dissesse a chorar isto que sinto!',
    'No gelo da indiferença ocultam-se as paixões.',
    'E se um dia hei de ser pó, cinza e nada, que seja minha noite uma alvorada, que eu saiba me perder para me encontrar...',
    'Longe de ti são ermos os caminhos.',
    'Perdoo facilmente as ofensas, mas por indiferença e desdém: nada que me vem dos outros me toca profundamente.',
    'Quero voltar! Não sei por onde vim…',
    'Ah! Não ser mais que a sombra duma sombra.',
    'Sonho... que eu e tu, dois pobrezinhos, andamos de mãos dadas, nos caminhos duma terra de rosas, num jardim...',
    'Sou aquele que passa e ninguém vê... Sou a que chamam triste sem o ser... Sou a que chora sem saber porquê...',
    'Sou talvez a visão que alguém sonhou, alguém que veio ao mundo pra me ver, e que nunca na vida me encontrou!',
    'Escreve-me! Ainda que seja só uma palavra, suave como o teu nome e casta como um perfume casto d’açucenas!',
    'Minh’alma, de sonhar-te, anda perdida... Não és sequer razão do meu viver, pois que tu és já toda a minha vida!',
    'Não és sequer razão do meu viver, pois que tu és já toda a minha vida!',
    'E, olhos postos em ti, digo de rastros: Ah! Podem voar mundos, morrer astros, que tú és como Deus: Princípio e fim...',
    'Guardo carinhosamente a promessa da sua visita. Que não fique apenas em promessa... Depressa, sim?',
    'Fez muito bem em ter dormido como um anjo, pois a causa da insónia seria uma ilusão como muitas...',
    'Hoje... a minha sede de infinito é maior do que eu, do que o mundo, do que tudo, e o meu espiritualismo ultrapassa o céu.',
    'Sonho que sou alguem cá neste mundo...',
    'E quando mais no ceu eu vou sonhando, E quando mais no alto ando voando, acordo do meu sonho... E não sou nada!',
    'Os dias são outonos: choram...choram...',
    'Beijos d’amor que vão de boca em boca, como pobres que vão de porta em porta!',
    'Pois de que falam os homens?! Que será que lhes põe nos olhos aquele brilho infernal, nas bocas aquela ruga, de cobiça?!',
    'A febre dos negócios?... Os sonhos de glória?... Ambições?... Invejas?...Não! Mulheres, unicamente...',
    'Nunca fui como todos.',
    'Nunca tive muitos amigos.',
    'Nunca fui favorita.',
    'Nunca fui o que meus pais queriam.',
    'Nunca tive alguém que amasse.',
    'Mas tive somente a mim, a minha absoluta verdade, meu verdadeiro pensamento, o meu conforto nas horas de sofrimento.',
    'Não vivo sozinha porque gosto, e sim porque aprendi a ser só...',
    'Teus olhos têm uma cor, de uma expressão tão divina, tão misteriosa e triste.',
    'Mas nem negros nem azuis, são teus olhos meu amor... Seriam da cor da mágoa, se a mágoa tivesse cor.',
    'Se tu viesses ver-me hoje à tardinha, E me prendesses toda nos teus braços...',
    'A tua boca... o eco dos teus passos... O teu riso de fonte... os teus abraços... Os teus beijos... a tua mão na minha...',
    'Os males do “mundo” toda a gente sabe! Os meus… ninguém…',
    'Do meu passado vejo o que não pude ter, lamento por este pesar.',
    'O amor fez de mim um monstro. Fez de mim apenas uma lembrança vaga.',
    'Uma lembrança ruim de um amor destruído. Destino maldito! Não se pode contê-lo, mas se pode vivê-lo.',
    'Pena é não haver um manicómio para corações, que para cabeças há muitos.',
    'Tudo no mundo é frágil, tudo passa…',
    'Eu sou a que no mundo anda perdida.',
    'Eu sou a que na vida não tem norte.',
    'Sou a irmã do Sonho, e desta sorte.',
    'Sou a crucificada... a dolorida...',
    'Sou aquela que passa e ninguém vê...',
    'Sou a que chamam triste sem o ser...',
    'Sou a que chora sem saber porquê...',
    'Alma de luto sempre incompreendida!...',
    'Na vida, para mim, não há deleite.',
    'Ando a chorar convulsa noite e dia...',
    'Ó Mulher! Como és fraca e como és forte!',
    'Como sabes ser doce e desgraçada!',
    'Como sabes fingir quando em teu peito a tua alma se estorce amargurada!',
    'Tortura do pensar! Triste lamento! Quem nos dera calar a tua voz!',
    'E não se quer pensar!... e o pensamento sempre a morder-nos bem, dentro de nós...',
    'E não se apaga, não... nada se apaga!',
    'Vem sempre perguntando: “O que te resta?...” Ah! não ser mais que o vago, o infinito!',
    'Ser pedaço de gelo, ser granito, ser rugido de tigre na floresta!',
    'Os meus gestos são ondas de Sorrento...',
    'Trago no nome as letras de uma flor...',
    'Dou-te o que tenho: o astro que dormita, O manto dos crepúsculos da tarde, o sol que é d’oiro, a onda que palpita.',
    'Dou-te comigo o mundo que Deus fez! - Eu sou aquela de quem tens saudade, a princesa do conto: “Era uma vez...”',
    'Bendita seja a mãe que te gerou, Bendito o leite que te fez crescer. Bendito o berço aonde te embalou.',
    'Bendita essa canção que acalentou da tua vida o doce alvorecer ...',
    'Bendita seja a lua, que inundou de luz, a terra, só para te ver...',
    'Benditos sejam todos que te amarem, as que em volta de ti ajoelharem numa grande paixão fervente e louca!',
    'E se mais que eu, um dia, te quiser, alguém, bendita seja essa mulher, bendito seja o beijo dessa boca!!',
    'Disseram-me hoje, assim, ao ver-me triste: “Parece Sexta-Feira de Paixão. Sempre a cismar, cismar de olhos no chão...',
    'Sempre a pensar na dor que não existe... O que é que tem?! Tão nova e sempre triste! Faça por estar contente! Pois então?!”',
    'Quando se sofre, o que se diz é vão... Meu coração, tudo, calado, ouviste ...',
    'Os meus males ninguém mos adivinha... A minha dor não fala, anda sozinha ...',
    'Dissesse ela o que sente! Ai quem me dera!...Os males de Anto toda a gente os sabe! Os meus... ninguém...',
    'A minha dor não cabe nos cem milhões de versos que eu fizera!...',
    'Sei lá! sei lá! eu sei lá bem.',
    'Quem sou?! um fogo-fátuo, uma miragem...',
    'Sou um reflexo... um canto de paisagem, ou apenas cenário! Um vaivém...',
    'Sei lá quem sou?! Sei lá! Sou a roupagem dum doido que partiu numa romagem e nunca mais voltou! Eu sei lá quem!...',
    'Sou um verme que um dia quis ser astro... Uma chaga sangrenta do Senhor... Sei lá quem sou?! Sei lá!',
    'Cumprindo os fados, num mundo de vaidades e pecados, sou mais um mau, sou mais um pecador...',
    'Sei lá quem sou?! sei lá!',
    'Sou a roupagem dum doido que partiu numa romagem.',
    'Ódio por ele? Não... se o amei tanto, se tanto bem lhe quis no meu passado, se o encontrei depois de o ter sonhado...',
    'Nunca mais o amar já é bastante! Quero senti-lo doutra, bem distante, Como se fora meu, calma e serena! ódio seria em mim saudade infinda.',
    'Ódio por ele? Não... não vale a pena...',
    'Ser poeta é ser mais alto, é ser maior do que os homens! Morder como quem beija!',
    'É ter de mil desejos o esplendor.',
    'E não saber sequer que se deseja!',
    'É ter garras e asas de condor!',
    'É ter fome, é ter sede de infinito!',
    'Por elmo, as manhãs de oiro e de cetim...',
    'É condensar o mundo num só grito!',
    'E é amar-te, assim, perdidamente...',
    'É seres alma e sangue e vida em mim',
    'E dizê-lo cantando a toda gente!',
    'Passo pálida e triste. Oiço dizer: “Que branca que ela é! Parece morta!”',
    'E eu que vou sonhando, vaga, absorta, não tenho um gesto, ou um olhar sequer... que diga o mundo e a gente o que quiser!',
    'O que é que isso me faz? o que me importa?...',
    'O frio que trago dentro gela e corta tudo que é sonho e graça na mulher!',
    'O frio que trago dentro gela e corta.',
    'O que é que me importa?! Essa tristeza É menos dor intensa que frieza, É um tédio profundo de viver!',
    'E é tudo sempre o mesmo, eternamente... O mesmo lago plácido, dormente... E os dias, sempre os mesmos, a correr...',
    'Sinto os passos da dor, essa cadência que é já tortura infinda, que é demência! que é já vontade doida de gritar!',
    'E é sempre a mesma mágoa, o mesmo tédio, a mesma angústia funda, sem remédio, andando atrás de mim, sem me largar!',
    'Dou-te o meu corpo prometido à morte!',
    'São os dedos do sol quando te abraço',
    'Vão-te envolvendo em círculos dantescos, felinamente, em voluptuosas danças...',
    'Que tu és como Deus: princípio e fim!..."',
    'Eu quero amar, amar perdidamente!',
    'Amar! Amar! E não amar ninguém!',
    'Recordar? esquecer? indiferente!...',
    'Prender ou desprender? É mal? É bem?',
    'Há uma primavera em cada vida.',
    'Pois se Deus nos deu voz, foi pra cantar!',
    'Que me saiba perder... pra me encontrar...',
    'Horas mortas... curvada aos pés do monte.',
    'Almas iguais à minha, almas que imploram, em vão remédio para tanta mágoa!',
    'Árvores! Não choreis! Olhai e vede:- Também ando a gritar, morta de sede, Pedindo a Deus a minha gota de água!',
    'Deixa-me ser a tua amiga, Amor;',
    'A tua amiga só, já que não queres, Que pelo teu amor seja a melhor.',
    'A mais triste de todas as mulheres.',
    'Que só, de ti, me venha mágoa e dor.',
    'O que me importa a mim?! O que quiseres.',
    'É sempre um sonho bom! Seja o que for, bendito sejas tu por mo dizeres!',
    'Beija-me as mãos, amor, devagarinho...',
    'Como se os dois nascêssemos irmãos, aves cantando, ao sol, no mesmo ninho...',
    'Guardar assim, fechados, nestas mãos, os beijos que sonhei pra minha boca!...',
    'Não sabem o que sinto e o que sou...',
    'Este frio que anda em mim, e que gelou',
    'Se eu nem sei por onde ando e onde vou!!',
    'E cai num abandono de esquecida!',
    'E fico, pensativa, olhando o vago...',
    'E as lágrimas que choro, branca e calma, ninguém as vê brotar dentro da alma! ninguém as vê cair dentro de mim!',
    'Gosto de ti, ó chuva, nos beirados.',
    'Dizendo coisas que ninguém entende!',
    'Talvez um dia entenda o teu mistério…',
    'Quando, inerte, na paz do cemitério, o meu corpo matar a fome às rosas!',
    'Tenho ódio à luz e raiva à claridade.',
    'Parece que a minha alma é perseguida, Por um carrasco cheio de maldade!',
    'Parece que a minha alma é perseguida.',
    'Ó minha vã, inútil mocidade.',
    'Trago em meus lábios roxos, a saudade!...',
    'Eu não gosto do sol, eu tenho medo, que me leiam nos olhos o segredo, de não amar ninguém, de ser assim!',
    'Eu não gosto do sol.',
    'Eu tenho medo.',
    'Eu tenho medo, que me leiam nos olhos o segredo.',
    'Gosto da noite imensa, triste, preta, como esta estranha e doida borboleta, que eu sinto sempre a voltejar em mim!...',
    'Gosto da noite imensa, triste, preta.',
    'Tudo é tristeza, tudo é pó, é nada!',
    'Vem logo a noite encher o coração!',
    'Que o nosso peito ri à gargalhada',
    'Flor que é nascida e logo desfolhada',
    'Pétalas que se pisam pelo chão!...',
    'Beijos de amor! pra quê?!... tristes vaidades!',
    'Sonhos que logo são realidades, que nos deixam a alma como morta!',
    'Só neles acredita quem é louca!',
    'Beijos de amor que vão de boca em boca, como pobres que vão de porta em porta!...',
    'É pensando nos homens que eu perdoo aos tigres as garras que dilaceram.',
    'A lembrança dos teus beijos.',
    'Sou bem diferente, sou, das outras mulheres todas. Eu quero antes os meus defeitos que as virtudes de todas as outras.',
    'Fico a cismar pensativa neste mistério encantado... Diga prá mim: de nós dois quem ama e quem é amado?...',
    'Li um dia, não sei onde, que em todos os namorados, uns amam muito, e os outros contentam-se em ser amados.',
    'Tenho vinte e três anos! Sou velhinha!'
];

// randomizador de array
// const random = Math.floor(Math.random() * arr.length);
// console.log(arr[random]);

// randomizador único do array
function genRandomElements(list) {
    let arrayCopy = [...list];
    let newArray = [];
    for (let i = 0; i < 1; i++) {
        let randNum = Math.floor(Math.random() * arrayCopy.length);
        let splicedItem = arrayCopy.splice(randNum, 1)[0]
        newArray.push(splicedItem);
    }
    return newArray;
}

/*
// método que posta o que está depois do 'status:' 
Twitter.post('statuses/update', { status: arr[random] }, function(err, data, response) {
    console.log(data);
  }); 
*/

// agendado para executar a cada hora do dia
cron.schedule('0 * * * *', () => {
    // método para enviar o tweet para o servidor
    Twitter.post('statuses/update',
        {
            status: genRandomElements(arr)
        },

        function (err, data, response) {
            console.log(data);
        });
});
