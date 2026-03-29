const span = (text, marks = []) => ({_type: 'span', text, ...(marks.length ? {marks} : {})})
const p = (text) => ({_type: 'block', style: 'normal', children: [span(text)]})
const h2 = (text) => ({_type: 'block', style: 'h2', children: [span(text)]})
const h3 = (text) => ({_type: 'block', style: 'h3', children: [span(text)]})
const lead = (bold, rest) => ({
  _type: 'block',
  style: 'normal',
  children: [span(bold, ['strong']), span(rest)],
})

export const enParagraphs = [
  'When a business chooses a website, it almost always looks in the wrong place. People usually compare startup cost: where it is cheaper, faster, where you can “poke the buttons yourself”. But the real question is not what the site costs in the first month. The real question is what it will cost you in six months, a year, and at the moment when the business starts to grow.',
  'There are three main scenarios on the market. First, website builders: Webflow, Framer, Wix, Weblium and other platforms that promise everything fast and without developers. Second, WordPress, which for years has been sold as a universal solution “for almost everything”. Third, custom development, where the site is built for the business task, not for another platform’s limits.',
  'At the start, all three options can look reasonable. But if you look not through the eyes of someone who needs a “site for yesterday”, but through the eyes of a business that needs a tool for sales, SEO, scaling and integrations, the picture changes sharply.',
  'The main mistake when choosing a website',
  'The most common mistake sounds like this: “Why pay more for code if you can quickly assemble it on a builder or on WordPress?”',
  'The answer is very simple: because a cheap launch and cheap ownership of a site are not the same thing at all.',
  'Builders almost always sell an easy entry. WordPress sells the illusion of flexibility. Custom development does not sell an easy entry — it sells control, scalability and predictability.',
  'If you need a site with three blocks, one form and one button — yes, you can assemble it on a builder and skip the drama. But if you want a multi-page site, SEO, a blog, multilingual setup, a catalog, integrations, analytics, filters, CRM, user accounts, payments, a proper mobile admin and the ability to evolve the project without prayers and sacrifices — the picture is completely different.',
  'Comparison table: builders, WordPress and code',
  'Builders: pretty, fast, convenient. While the site is small',
  'Website builders really solve one task well: quickly assemble a simple page without a developer. For a landing page, hypothesis test, event, temporary page or MVP, that can be a reasonable solution.',
  'The problem is that real business starts next. And it suddenly turns out that all this “simplicity” works exactly until the site stops being a toy and becomes a serious tool.',
  'At first everything looks harmless. A basic plan is roughly $15–40 per month. Sometimes higher. Sometimes the domain is separate. Sometimes you need a separate plan to remove the platform logo. Sometimes higher again if you need real traffic. And then builders’ favorite part begins: extra charges for literally everything.',
  'Need multilingual? Pay.',
  'Need CRM integration? Pay.',
  'Need e-commerce? Pay more and sometimes a percent on sales.',
  'Need more complex forms? Pay.',
  'Need automations? Pay.',
  'Need proper search, filters, dynamic collections, extensions? Pay again.',
  'So a site that looked “cheap” at the start quickly turns into a subscription funnel for the business owner. And you pay not for growing the project, but for not hitting the platform’s limits.',
  'It gets especially fun on multi-page sites. While you have five pages and a couple of sections, the editor feels convenient. When you have thirty, fifty or a hundred pages, when a blog appears, cases, several content types, versions in several languages, complex forms, UTM tags, integrations and an attempt to build a proper SEO structure, all the “magic” starts cracking.',
  'Plus many builders have a fundamental problem: you do not own the system as an asset. You cannot freely take the platform’s logic with you. You are tied to the service, its pricing, its rules, its interface, its changes. That is not owning a site. That is renting space inside someone else’s ecosystem.',
  'Why builders only work in certain scenarios',
  'You have to be honest: builders are not useless. They are good when the task is small and temporary. For example:',
  'a one-page site to launch ads',
  'a landing page for a specific offer',
  'a promo page for an event',
  'testing a niche or a hypothesis',
  'an MVP without serious load or complex logic',
  'In all other cases a builder often becomes not a solution, but a deferred problem. What looks like savings today turns into pain, migration and overpayment in 6–12 months.',
  'WordPress: not the golden mean, but a compromise',
  'For years WordPress has been positioned as a “reasonable compromise”. Not as expensive as code, not as limited as a builder. Partly true. WordPress can work for small and medium sites — but only until the project starts getting complex.',
  'WordPress’s strength is the huge number of themes, plugins, integrations and specialists. WordPress’s weakness is the same thing.',
  'Because almost every WordPress question is solved not by architecture, but by installing another plugin. Need SEO setup? Plugin. Multilingual? Plugin. Forms? Plugin. Cache? Plugin. Security? Plugin. Import? Plugin. Image optimization? Plugin. And suddenly your site is not a system — it is a layered cake of third-party solutions that must not conflict. And they do, surprise.',
  'From the outside WordPress can look like a convenient CMS. Inside it is often a pile of dependencies where any update can unexpectedly break part of the site. Especially if the project is built on Elementor, a pile of Elementor add-ons, custom templates, free plugins “from a forum” and hosting priced like instant noodles.',
  'Reliability: where a site can die just because “something went wrong”',
  'This block matters: many people think reliability is only about the server. No. Site reliability is how predictable the system is and how easy it is to control its state.',
  'Builders and reliability',
  'On a builder it is simple: you did not pay the plan — the site disappeared or the functionality was cut. The platform changed rules, limits, pricing or features — you live with it. You have no leverage. The platform went down, updated, changed the model, limited features for your plan — you do not control it.',
  'A builder is convenient until there is a serious conflict of interest between your business and the platform’s policy.',
  'WordPress and reliability',
  'WordPress has a different kind of problem. Formally the site is yours. In practice it can become a minefield:',
  'you did not renew a paid plugin — part of the functionality disappeared',
  'WordPress was updated — the theme broke',
  'the theme was updated — Elementor broke',
  'Elementor was updated — the layout fell apart',
  'you installed a free plugin — it conflicts with forms or cache',
  'the host updated PHP — half the modules stopped working',
  'the plugin is no longer supported, but critical functionality depends on it',
  'And you wake up in the morning and the site does not work. Or it works badly. Or forms do not send. Or the cart does not checkout. Or the mobile page suddenly shifted. And fixing such a site can cost more than building a proper code architecture without this pile of crutches.',
  'About Elementor separately. It can be convenient for very simple tasks and content edits by a manager, but on complex projects it often becomes a source of instability, DOM bloat, performance drops and surprises after updates. Many businesses learn this after the fact, when the site lives its own life.',
  'Custom development and reliability',
  'Custom development is not magic and not a bulletproof vest. But its main advantage is predictability. If the project is built properly, with clear architecture, without garbage and without a dozen third-party crutches, risks are much lower.',
  'Yes, code must be maintained. Yes, the server must be administered. But with code you at least have transparency: you know what the system consists of, what is responsible for what, what updates, where to look for the problem and how to fix it. This is not “hopefully after the next plugin update nothing dies”. This is a managed system.',
  'Who really owns the website',
  'Almost nobody explains this to clients properly — and that is a mistake. It is one of the most important questions.',
  'Builder',
  'On a builder you are not a full owner of the site in the sense business means it. Yes, you may have your domain. Yes, you manage content. But the site as a system lives inside someone else’s platform. You do not own the engine, you do not control infrastructure, you cannot freely take the whole project and deploy it anywhere without losses. You depend on the platform completely.',
  'Legally and technically your control is limited. This is closer to renting a storefront than owning a digital asset.',
  'WordPress',
  'On WordPress the situation is better. Usually you own the domain, hosting, files and database. That is much closer to real ownership. But there is a nuance: if half the site depends on paid plugins, licenses, third-party themes and a contractor who “only he knows how it is wired”, your ownership becomes conditional. Formally the site is yours. Practically you can still be locked in.',
  'Custom development',
  'In custom development, with proper handover, you really are the owner of the site as an asset. You have code, domain, server, database, admin, documentation and the ability to hand the project to another team without losing the product. That is a normal ownership model.',
  'A business should own its tool, not rent the right to use it.',
  'SEO, performance and growth',
  'On builders SEO is usually basic. For simple pages it is enough. But as soon as you need fine metadata control, templates, indexing, structure, content generation, performance, technical rules, hreflang, complex pages, filters and large SEO scenarios, the platform starts limiting you.',
  'WordPress has wider capabilities, but almost everything again depends on plugins and build quality. One WordPress site can be tolerable; another loads like a sack of bricks because everything was piled on top.',
  'Custom development lets you build architecture for SEO and performance from the start. That does not mean any coded site is automatically good. It means there is no built-in platform ceiling and no need to drag extra layers of garbage.',
  'When to choose what',
  'If you strip the marketing fluff, the picture is this:',
]

export const ukParagraphs = [
  'Коли бізнес обирає сайт, він майже завжди дивиться не туди. Зазвичай порівнюють ціну старту: де дешевше, де швидше, де «можна самому поклацати кнопки». Але справжнє питання не в тому, скільки сайт коштує в перший місяць. Справжнє питання в іншому: скільки він коштуватиме вам через пів року, рік і в момент, коли бізнес почне рости.',
  'На ринку є три основні сценарії. Перший — конструктори сайтів: Webflow, Framer, Wix, Weblium та інші платформи, які обіцяють усе швидко і без програмістів. Другий — WordPress, який роками подається як універсальне рішення «майже для всього». Третій — кодова розробка, де сайт збирають під задачу бізнесу, а не під обмеження чужої платформи.',
  'На старті всі три варіанти можуть виглядати адекватно. Але якщо дивитися не очима людини, якій потрібен «сайт на вчора», а очима бізнесу, якому потрібен інструмент для продажів, SEO, масштабування та інтеграцій, картина різко змінюється.',
  'Головна помилка при виборі сайту',
  'Найчастіша помилка звучить так: «Навіщо платити більше за код, якщо можна швидко зібрати на конструкторі або на WordPress?»',
  'Відповідь дуже проста: тому що дешевий старт і дешеве володіння сайтом — це взагалі не одне й те саме.',
  'Конструктори майже завжди продають зручний вхід. WordPress продає ілюзію гнучкості. Кодова розробка продає не зручний вхід, а контроль, масштабованість і передбачуваність.',
  'Якщо вам потрібен сайт на три блоки, одна форма й одна кнопка — так, можна зібрати на конструкторі й не влаштовувати драму. Але якщо ви хочете багатосторінковий сайт, SEO, блог, мультимовність, каталог, інтеграції, аналітику, фільтри, CRM, особисті кабінети, оплату, нормальну мобільну адмінку і можливість доробляти проєкт без молитов і жертвоприношень — картина вже зовсім інша.',
  'Порівняльна таблиця: конструктори, WordPress і код',
  'Конструктори: красиво, швидко, зручно. Поки сайт маленький',
  'Конструктори сайтів справді добре вирішують одну задачу: швидко зібрати просту сторінку без розробника. Для лендингу, тесту гіпотези, івента, тимчасової сторінки або MVP це може бути нормальним рішенням.',
  'Проблема в тому, що далі починається реальний бізнес. І раптом виявляється, що вся ця «простота» працює рівно доти, доки сайт не стає серйозним інструментом.',
  'Спочатку все виглядає безневинно. Базовий тариф — умовно 15–40 доларів на місяць. Іноді вище. Іноді домен окремо. Іноді окремий тариф, щоб прибрати логотип платформи. Іноді ще вище, якщо потрібен нормальний трафік. А далі починається улюблена частина конструкторів: доплати буквально за все.',
  'Потрібна мультимовність? Плати.',
  'Потрібна інтеграція з CRM? Плати.',
  'Потрібен e-commerce? Плати більше і іноді ще відсоток з продажів.',
  'Потрібні форми складніші? Плати.',
  'Потрібні автоматизації? Плати.',
  'Потрібен нормальний пошук, фільтри, динамічні колекції, розширення? Знову плати.',
  'Тобто сайт, який на старті здавався «дешевим», дуже швидко перетворюється на підписну воронку для власника бізнесу. І ти платиш не за розвиток проєкту, а за те, щоб хоч якось не впертися в обмеження платформи.',
  'Особливо весело на багатосторінкових сайтах. Поки у тебе п’ять сторінок і пара секцій, редактор здається зручним. Коли сторінок стає тридцять, п’ятдесят або сто, коли з’являється блог, кейси, кілька типів контенту, версії кількома мовами, складні форми, UTM-мітки, інтеграції і спроба зробити нормальну SEO-структуру, вся «магія» починає тріскатися.',
  'Плюс у багатьох конструкторів є фундаментальна проблема: ти не володієш системою як активом. Ти не можеш вільно перенести логіку платформи до себе. Ти прив’язаний до сервісу, до тарифів, до правил, до інтерфейсу, до змін. Це не володіння сайтом. Це оренда місця всередині чужої екосистеми.',
  'Чому конструктори хороші лише в певних сценаріях',
  'Треба бути чесним: конструктори не безкорисні. Вони хороші, коли задача маленька і тимчасова. Наприклад:',
  'односторінковий сайт для запуску реклами',
  'лендинг під конкретну пропозицію',
  'промосторінка під захід',
  'тестування ніші або гіпотези',
  'MVP без серйозного навантаження і складної логіки',
  'У всіх інших випадках конструктор дуже часто стає не рішенням, а відкладеною проблемою. Те, що сьогодні здається економією, через 6–12 місяців перетворюється на головний біль, міграцію і переплату.',
  'WordPress: не золота середина, а компроміс',
  'WordPress роками тримався як «розумний компроміс». Мовляв, не так дорого, як код, і не так обмежено, як конструктор. Частково це правда. WordPress справді може бути робочим варіантом для невеликих і середніх сайтів. Але лише доти, доки проєкт не починає ускладнюватися.',
  'Головна сила WordPress у тому, що для нього є величезна кількість тем, плагінів, інтеграцій і спеціалістів. Головна слабкість WordPress — у тому самому.',
  'Тому що майже будь-яке питання в WordPress вирішується не архітектурою, а встановленням ще одного плагіна. Потрібне SEO-налаштування? Плагін. Мультимовність? Плагін. Форми? Плагін. Кеш? Плагін. Захист? Плагін. Імпорт? Плагін. Оптимізація зображень? Плагін. І ось уже сайт складається не з системи, а з шарового пирога чужих рішень, які зобов’язані не конфліктувати. А вони, сюрприз, конфліктують.',
  'Ззовні WordPress може виглядати як зручна CMS. Всередині це часто набір залежностей, де будь-яке оновлення може несподівано зламати частину сайту. Особливо якщо проєкт зібраний на Elementor, купі аддонів до Elementor, кастомних шаблонах, безкоштовних плагінах «з форуму» і хостингу за ціну пачки лапші.',
  'Надійність: де сайт може померти просто тому, що «щось пішло не так»',
  'Цей блок важливий: багато хто думає, що надійність — це лише про сервер. Ні. Надійність сайту — це наскільки система передбачувана і наскільки легко контролювати її стан.',
  'Конструктори і надійність',
  'На конструкторі все просто: не оплатили тариф — сайт зник або функціональність урізали. Платформа змінила правила, ліміти, тарифи або можливості — ви з цим живете. У вас немає важелів. Платформа лягла, оновилася, змінила модель, обмежила функціональність для вашого тарифу — ви це не контролюєте.',
  'Конструктор зручний до першого серйозного конфлікту інтересів між вашим бізнесом і політикою платформи.',
  'WordPress і надійність',
  'У WordPress інший тип проблем. Формально сайт ваш. Але фактично він може стати мінним полем:',
  'не продовжили платний плагін — частина функцій зникла',
  'оновили WordPress — тема зламалася',
  'оновили тему — зламався Elementor',
  'оновили Elementor — посипалась верстка',
  'поставили безкоштовний плагін — конфлікт з формами або кешем',
  'хостинг оновив PHP — половина модулів перестала працювати',
  'плагін більше не підтримується, а на ньому тримається критичний функціонал',
  'І ви прокидаєтеся вранці, а сайт не працює. Або працює криво. Або форми не відправляються. Або кошик не оформлює замовлення. Або сторінка на мобилі раптом «попливла». І ремонт такого сайту може коштувати дорожче, ніж спочатку зробити нормальну кодову архітектуру без цієї колекції костилів.',
  'Про Elementor окремо. Він може бути зручним для дуже простих задач і контентних правок менеджером, але на складних проєктах часто стає джерелом нестабільності, перевантаження DOM, падіння продуктивності і сюрпризів після оновлень. Багато бізнесів дізнаються про це постфактум, коли сайт живе своїм життям.',
  'Кодова розробка і надійність',
  'Кодова розробка не магія і не бронежилет. Але у неї головна перевага: передбачуваність. Якщо проєкт зроблено нормально, з зрозумілою архітектурою, без сміття і без десятка сторонніх костилів, ризики значно нижчі.',
  'Так, код теж треба підтримувати. Так, сервер теж треба адмініструвати. Але в разі коду є прозорість: зрозуміло, з чого складається система, що за що відповідає, що оновлюється, де шукати проблему і як її вирішити. Це не «авось після чергового оновлення плагіна все не помре». Це керована система.',
  'Хто власник сайта насправді',
  'Цей момент майже ніхто нормально не пояснює клієнтам — а дарма. Це одне з найважливіших питань.',
  'Конструктор',
  'На конструкторі ви не є повноцінним власником сайту в тому сенсі, в якому це розуміє бізнес. Так, може бути свій домен. Так, ви керуєте контентом. Але сам сайт як система живе всередині чужої платформи. Ви не володієте рушієм, не контролюєте інфраструктуру, не можете вільно забрати весь проєкт і розгорнути де завгодно без втрат. Ви залежите від платформи повністю.',
  'Юридично і технічно ваш контроль обмежений. Це скоріше оренда вітрини, а не володіння цифровим активом.',
  'WordPress',
  'На WordPress ситуація краща. Зазвичай ви володієте доменом, хостингом, файлами й базою. Це вже набагато ближче до реальної власності. Але нюанс: якщо половина сайту тримається на платних плагінах, ліцензіях, чужих темах і підряднику, який «тільки він знає, як там усе влаштовано», ваша власність виходить дуже умовною. Формально сайт ваш. Практично ви все одно в залежності.',
  'Кодова розробка',
  'У кодовій розробці при правильній передачі проєкту ви справді є власником сайту як активу. Є код, домен, сервер, база, адмінка, документація і можливість передати проєкт іншій команді без втрати продукту. Це нормальна модель власності.',
  'Бізнес має володіти інструментом, а не орендувати право ним користуватися.',
  'SEO, продуктивність і зростання',
  'На конструкторах SEO зазвичай базовий рівень. Для простих сторінок вистачить. Але щойно потрібен тонкий контроль метаданих, шаблонів, індексації, структури, генерації контенту, продуктивності, технічних правил, hreflang, складних сторінок, фільтрів і масштабних SEO-сценаріїв, платформа починає обмежувати.',
  'У WordPress можливості ширші, але майже все знову упирається в плагіни і в якість збірки. Один сайт на WordPress може бути терпимим, а інший вантажиться як мішок з цеглинами, бо на ній навісили все підряд.',
  'Кодова розробка дозволяє будувати архітектуру під SEO і продуктивність одразу. Це не означає, що будь-який кодовий сайт автоматично хороший. Це означає, що там немає вбудованої стелі платформи і немає потреби тягнути зайві шари сміття.',
  'Коли що обирати',
  'Якщо відкинути маркетингову лапшу, картина така:',
]

export const tableEn = {
  _type: 'ptTable',
  caption: 'Website builders, WordPress and custom development — by criteria',
  hasHeaderRow: true,
  rows: [
    {cells: [{text: 'Criterion'}, {text: 'Builders'}, {text: 'WordPress'}, {text: 'Custom development'}]},
    {cells: [{text: 'Startup cost', strong: true}, {text: 'Low or medium'}, {text: 'Medium'}, {text: 'Higher'}]},
    {cells: [{text: 'Monthly costs', strong: true}, {text: 'Often high due to subscriptions'}, {text: 'Medium or variable'}, {text: 'Usually lower and clearer'}]},
    {cells: [{text: 'Hidden fees', strong: true}, {text: 'A lot'}, {text: 'Many'}, {text: 'Minimal'}]},
    {cells: [{text: 'Site speed', strong: true}, {text: 'Medium'}, {text: 'Often below average'}, {text: 'High'}]},
    {cells: [{text: 'SEO capabilities', strong: true}, {text: 'Limited'}, {text: 'Medium'}, {text: 'Maximum'}]},
    {cells: [{text: 'Multilingual', strong: true}, {text: 'Often paid and inconvenient'}, {text: 'Via plugins, not always stable'}, {text: 'Can be done properly'}]},
    {cells: [{text: 'Integrations', strong: true}, {text: 'Limited by the platform'}, {text: 'Via plugins'}, {text: 'Any'}]},
    {cells: [{text: 'Admin UI', strong: true}, {text: 'Simple at first, then gets in the way'}, {text: 'Often overloaded'}, {text: 'Built for the task'}]},
    {cells: [{text: 'Mobile work', strong: true}, {text: 'Limited convenience'}, {text: 'Usually inconvenient'}, {text: 'Can be done properly'}]},
    {cells: [{text: 'Scalability', strong: true}, {text: 'Limited'}, {text: 'Limited or medium'}, {text: 'High'}]},
    {cells: [{text: 'Design flexibility', strong: true}, {text: 'Within the platform'}, {text: 'Partial'}, {text: 'Full'}]},
    {cells: [{text: 'Reliability', strong: true}, {text: 'Depends on plan payment and platform rules'}, {text: 'Depends on plugins, hosting and updates'}, {text: 'Controlled by development'}]},
    {cells: [{text: 'Ownership of the site', strong: true}, {text: 'Limited'}, {text: 'Partial'}, {text: 'Full'}]},
    {cells: [{text: 'Reliance on vendor / platform', strong: true}, {text: 'Very high'}, {text: 'Medium'}, {text: 'Low'}]},
    {cells: [{text: 'Best for', strong: true}, {text: 'Landing pages, MVPs, temporary solutions'}, {text: 'Small and medium projects'}, {text: 'Business sites, catalogs, complex services'}]},
  ],
}

export const tableUk = {
  _type: 'ptTable',
  caption: 'Конструктори, WordPress і кодова розробка — за критеріями',
  hasHeaderRow: true,
  rows: [
    {cells: [{text: 'Критерій'}, {text: 'Конструктори'}, {text: 'WordPress'}, {text: 'Кодова розробка'}]},
    {cells: [{text: 'Вартість старту', strong: true}, {text: 'Низька або середня'}, {text: 'Середня'}, {text: 'Вища'}]},
    {cells: [{text: 'Щомісячні витрати', strong: true}, {text: 'Часто високі через підписки'}, {text: 'Середні або плаваючі'}, {text: 'Зазвичай нижчі та зрозуміліші'}]},
    {cells: [{text: 'Приховані платежі', strong: true}, {text: 'Дуже багато'}, {text: 'Багато'}, {text: 'Мінімум'}]},
    {cells: [{text: 'Швидкість сайту', strong: true}, {text: 'Середня'}, {text: 'Часто нижче середньої'}, {text: 'Висока'}]},
    {cells: [{text: 'SEO-можливості', strong: true}, {text: 'Обмежені'}, {text: 'Середні'}, {text: 'Максимальні'}]},
    {cells: [{text: 'Мультимовність', strong: true}, {text: 'Часто платна і незручна'}, {text: 'Через плагіни, не завжди стабільно'}, {text: 'Робиться нормально'}]},
    {cells: [{text: 'Інтеграції', strong: true}, {text: 'Обмежені платформою'}, {text: 'Через плагіни'}, {text: 'Будь-які'}]},
    {cells: [{text: 'Адмінка', strong: true}, {text: 'Проста спочатку, потім заважає'}, {text: 'Часто перевантажена'}, {text: 'Робиться під задачу'}]},
    {cells: [{text: 'Робота з мобільного', strong: true}, {text: 'Обмежено зручно'}, {text: 'Зазвичай незручно'}, {text: 'Можна зробити нормально'}]},
    {cells: [{text: 'Масштабованість', strong: true}, {text: 'Обмежена'}, {text: 'Обмежена або середня'}, {text: 'Висока'}]},
    {cells: [{text: 'Гнучкість дизайну', strong: true}, {text: 'У межах платформи'}, {text: 'Часткова'}, {text: 'Повна'}]},
    {cells: [{text: 'Надійність', strong: true}, {text: 'Залежить від оплати тарифу і правил платформи'}, {text: 'Залежить від плагінів, хостингу та оновлень'}, {text: 'Контролюється розробкою'}]},
    {cells: [{text: 'Власність на сайт', strong: true}, {text: 'Обмежена'}, {text: 'Часткова'}, {text: 'Повна'}]},
    {cells: [{text: 'Залежність від підрядника / платформи', strong: true}, {text: 'Дуже висока'}, {text: 'Середня'}, {text: 'Низька'}]},
    {cells: [{text: 'Підходить для', strong: true}, {text: 'Лендингів, MVP, тимчасових рішень'}, {text: 'Невеликих і середніх проєктів'}, {text: 'Бізнес-сайтів, каталогів, складних сервісів'}]},
  ],
}

export const enMeta = {
  title: 'Builders, WordPress or code: what businesses should pick and where you lose money',
  excerpt:
    'People compare launch price; you should look at total cost of ownership in six months and a year. We break down three paths — builders, WordPress and code — with a criteria table and why a cheap launch is not cheap to run.',
  seo: {
    metaTitle: 'Builders vs WordPress vs code: what to choose for business',
    metaDescription:
      'Stop comparing launch price — count total cost of ownership. Builders, WordPress, code: reliability, SEO, ownership. A direct comparison.',
    ogTitle: 'Where you really lose money: builder, WP or custom code',
    ogDescription:
      'Cheap launch ≠ cheap operations. For teams building a business, not a placeholder page.',
  },
}

export const ukMeta = {
  title: 'Конструктор, WordPress чи код: що обрати бізнесу і де ви втратите більше грошей',
  excerpt:
    'Порівнюють ціну старту, а треба дивитися вартість володіння через пів року і рік. Розбираємо три сценарії — конструктори, WordPress і код — з таблицею критеріїв і відповіддю, чому дешевий вхід не дорівнює дешевій експлуатації.',
  seo: {
    metaTitle: 'Конструктор, WordPress чи код: що обрати бізнесу',
    metaDescription:
      'Не ціну старту порівнюють даремно — рахуйте вартість володіння. Таблиця: конструктори, WordPress, код; надійність, SEO, власність на сайт.',
    ogTitle: 'Де ви реально втратите гроші: конструктор, WP чи код',
    ogDescription:
      'Дешевий вхід ≠ дешеве володіння. Розбір для тих, хто будує бізнес, а не «сторінку».',
  },
}

export const enTailBlocks = [
  lead(
    'A website builder',
    ' is the right choice if you need a very simple site, a landing page, a temporary solution, an MVP, or a fast hypothesis test.',
  ),
  lead(
    'WordPress',
    ' can work if the project is not too complex, your budget is tight, and you understand the risks tied to plugins, maintenance and performance.',
  ),
  lead(
    'Custom development',
    ' is what you choose when the site is not just a “page on the internet” but a full business tool: SEO, growth, integrations, non-standard logic, a catalog, a blog, multilingual setup, analytics, CRM and scaling plans.',
  ),
  h2('FAQ'),
  h3('Is it true that a builder is always cheaper?'),
  p(
    'Often yes at the start. Often no over the long run. Subscriptions, extra fees, limits, commissions, expensive plans as you grow and a later migration can make it the most expensive option.',
  ),
  h3('Is it true that WordPress is “almost like code, only cheaper”?'),
  p(
    'No. WordPress is a CMS with a plugin ecosystem. It can be convenient, but it is not the same as a project built for specific business logic and architecture.',
  ),
  h3('Is it true that custom development is only for large companies?'),
  p(
    'No. It fits anyone for whom the site is a working tool, not just a business card. Yes, the entry barrier is higher. But in many niches it pays off very fast.',
  ),
  h3('Can you build a good site on WordPress?'),
  p(
    'Yes. But the question is how long it stays good if the project actively grows, accumulates features and depends on many third-party solutions.',
  ),
  h3('Can you build a good site on a builder?'),
  p(
    'Yes, if it is a small project without complex requirements. But over the long run platform limits are usually the main problem.',
  ),
  h3('Who owns a site on a builder?'),
  p(
    'You own the content and the domain, but you do not fully own the system. You depend on the platform and its rules.',
  ),
  h3('Who owns a site on WordPress?'),
  p(
    'Most often you own the domain, hosting, files and database, but you can still depend on licenses, plugins and a contractor.',
  ),
  h3('Who owns a coded site?'),
  p(
    'With proper handover, you are the owner. It is a full digital business asset.',
  ),
  h3('What is more reliable?'),
  p(
    'All else equal, the most predictable and manageable model is quality custom development. Builders depend on the platform. WordPress depends on the plugin ecosystem and build quality.',
  ),
  h2('Conclusion'),
  p(
    'If you need a site “just to exist”, you can pick anything. A builder, WordPress, a template — it does not matter. For that task almost any solution will do.',
  ),
  p(
    'But if you are building a business, not just a page, the site must be an asset, not a pile of compromises. It must be fast, reliable, scalable, easy to manage, adapted for SEO and not turn into a pumpkin because you forgot to pay another subscription or some plugin decided to die at the worst moment.',
  ),
  p(
    'Builders are good as a temporary solution. WordPress is good as a compromise. Custom development is good as a system you can grow on.',
  ),
  p(
    'And here all the magic ends with a simple idea: a cheap site is almost always expensive to run. And a site built as a proper tool from the start almost always pays off better than endless wrangling with subscriptions, plugins, limits and sudden breakdowns.',
  ),
]

export const ukTailBlocks = [
  lead(
    'Конструктор',
    ' варто обирати, якщо вам потрібен дуже простий сайт, лендинг, тимчасове рішення, MVP або швидкий тест гіпотези.',
  ),
  lead(
    'WordPress',
    ' може підійти, якщо проєкт не надто складний, у вас обмежений бюджет і ви розумієте ризики, пов’язані з плагінами, підтримкою та продуктивністю.',
  ),
  lead(
    'Кодову розробку',
    ' треба обирати, якщо сайт — це не просто «сторінка в інтернеті», а повноцінний бізнес-інструмент: з SEO, зростанням, інтеграціями, нестандартною логікою, каталогом, блогом, мультимовністю, аналітикою, CRM і планами масштабування.',
  ),
  h2('Часті питання'),
  h3('Чи правда, що конструктор завжди дешевший?'),
  p(
    'На старті часто так. На дистанції дуже часто ні. Підписки, доплати, обмеження, комісії, дорогі тарифи на зростанні та подальша міграція можуть зробити його найдорожчим варіантом.',
  ),
  h3('Чи правда, що WordPress — це «майже як код, але дешевше»?'),
  p(
    'Ні. WordPress — це CMS з екосистемою плагінів. Він може бути зручним, але це не те саме, що проєкт, зібраний під конкретну бізнес-логіку й архітектуру.',
  ),
  h3('Чи правда, що кодова розробка підходить лише великим компаніям?'),
  p(
    'Ні. Вона підходить усім, для кого сайт — робочий інструмент, а не просто візитка. Так, вхідний поріг вищий. Але в низці ніш це окупається дуже швидко.',
  ),
  h3('Чи можна зробити хороший сайт на WordPress?'),
  p(
    'Можна. Але питання в тому, як довго він залишатиметься хорошим, якщо проєкт активно росте, обростає функціями й залежить від багатьох сторонніх рішень.',
  ),
  h3('Чи можна зробити хороший сайт на конструкторі?'),
  p(
    'Можна, якщо це невеликий проєкт без складних вимог. Але на довгій дистанції саме обмеження платформи найчастіше стають головною проблемою.',
  ),
  h3('Хто володіє сайтом на конструкторі?'),
  p(
    'Ви володієте контентом і доменом, але не володієте системою в повному сенсі. Ви залежите від платформи й її правил.',
  ),
  h3('Хто володіє сайтом на WordPress?'),
  p(
    'Частіше за все ви володієте доменом, хостингом, файлами й базою даних, але можете залишатися залежними від ліцензій, плагінів і підрядника.',
  ),
  h3('Хто володіє кодовим сайтом?'),
  p(
    'При нормальній передачі проєкту власником є ви. Це повноцінний цифровий актив бізнесу.',
  ),
  h3('Що надійніше?'),
  p(
    'На рівних умовах найпередбачуваніша та керована модель — якісна кодова розробка. Конструктори залежать від платформи. WordPress залежить від екосистеми плагінів і якості збірки.',
  ),
  h2('Висновок'),
  p(
    'Якщо вам потрібен сайт «лиш би був», можна брати що завгодно. Конструктор, WordPress, шаблон — неважливо. Для такої задачі підійде майже будь-яке рішення.',
  ),
  p(
    'Але якщо ви будуєте бізнес, а не просто сторінку, тоді сайт має бути активом, а не набором компромісів. Він має бути швидким, надійним, масштабованим, зручним у керуванні, адаптованим під SEO і не перетворюватися на гарбуз через те, що ви забули оплатити чергову підписку або якийсь плагін вирішив «померти» в найкращий момент.',
  ),
  p(
    'Конструктори хороші як тимчасове рішення. WordPress хороший як компроміс. Кодова розробка хороша як система, на якій можна рости.',
  ),
  p(
    'І ось тут уся магія закінчується простою думкою: дешевий сайт майже завжди дорогий в експлуатації. А сайт, який спочатку зроблений як нормальний інструмент, майже завжди окупається краще, ніж уся ця нескінченна возня з підписками, плагінами, обмеженнями та раптовими поломками.',
  ),
]
