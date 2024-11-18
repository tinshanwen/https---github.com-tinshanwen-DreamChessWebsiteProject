
const exploreContainer = document.querySelector("#exploreContainer");

function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
  
function getTypeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('type');
}

function displayItem() {
    const id = getIdFromUrl();
    const type = getTypeFromUrl();
    
    if (type === 'coach' && coachDatabase[id]) {
        exploreContainer.innerHTML = coachDatabase[id];  // Display coach details
    } else if (type === 'competition' && competitionDatabase[id]) {
        exploreContainer.innerHTML = competitionDatabase[id];  // Display competition details
    }
    // else {
    //     exploreContainer.innerHTML = "<p>No details found.</p>";  // Fallback
    // }
}

// Below is database
const coachDatabase = {
    1: `
        <h1>Coach Profile: GM Avetik Grigoryan</h1>
        <img src="../image/coach/avetik.jpeg" alt="">

        <h2 class="align-left">Location</h2>
        <p>United States</p>

        <h2 class="align-left">Languages</h2>
        <p>English (US)</p>

        <h2 class="align-left">Rating</h2>
        <p>FIDE: 2568</p>
        <p>Peak Rating: 2818</p>

        <h2 class="align-left">Hourly Rate</h2>
        <p>$300/h</p>

        <h2>About Me</h2>
        <p>I am Grandmaster Avetik Grigoryan (FIDE 2568, max 2623), founder and head coach of chessmood.com.</p>
        <p>Here you can find more info about me: <a href="https://en.wikipedia.org/wiki/Avetik_Grigoryan">Wikipedia</a></p>
        <p>FIDE Profile: <a href="https://ratings.fide.com/id.phtml?event=13302191">FIDE Profile</a></p>
        <p>Before going further, I highly recommend reading the following article: <a href="https://chessmood.com/blog/find-the-right-chess-coach-guide">Find the Right Chess Coach Guide</a></p>

        <h2>Playing Experience</h2>
        <p>I started playing chess at 4, when my father was at war and my Grandma taught me the game. After my father came back, he took me to a chess school where I had my first coach at six.</p>
        <p>At 13, I started to work seriously on chess, and at 15 I became the Armenian Champion under 18. By 17, I became an International Master and set a goal to become a Grandmaster within a year—and I did it!</p>
        <p>One of my biggest achievements was winning the Armenian National Championship in 2010 and representing my national team in the Olympiad.</p>

        <h2>Teaching Experience</h2>
        <p>I have been teaching chess for 8 years. I was the director of one of the biggest chess schools in Armenia and coached several national teams. Recently, with other Grandmaster friends, I created ChessMood.com to help chess lovers level up their skills.</p>
        <p>I have helped over 10 chess players achieve the Grandmaster title.</p>
        <p>When I was 18, I cracked the code to becoming a Grandmaster, and now I help others achieve the same.</p>

        <h2>Other Experiences</h2>
        <p>I practice Kung Fu (Wing Chun) and believe that the body and mind are more linked than most people think.</p>

        <h2>Best Skills</h2>
        <p>Instead of boasting, I will let my students’ feedback speak for itself: <a href="#">Student Feedback</a></p>

        <h2>Teaching Methodology</h2>
        <p>My methodologies are different. I focus on the RIGHT MINDSET. I believe in the motto "Right Mood - Right Move." I first work on unlocking your potential and resetting your mindset.</p>
        <p>Then, I explore your weaknesses and use my extensive database to tackle issues such as calculation, endgames, and openings.</p>
        <p>Lastly, I push you to take determined action—because if you don’t achieve your goals, I’ll be the first to kick your ass! :D</p>

        <button onclick="window.open('https://wa.me/60126589098', '_blank')">Contact Me</button>
        <button onclick="window.history.back()">Back</button>
    `,
    2: `
        <h1>IM Matyas Marek</h1>
        <img src="../image/coach/matyas.jpeg" alt="">

        <h2 class="align-left">Location</h2>
        <p>Baltimore, United States</p>

        <h2 class="align-left">Languages</h2>
        <p>English (US)</p>

        <h2 class="align-left">Rating</h2>
        <p>FIDE: 2346</p>
        <p>Rating: 2618</p>
        <p>Peak Rating: 2737</p>

        <h2 class="align-left">Hourly Rate</h2>
        <p>50 USD</p>

        <h2>About Me</h2>
        <p>My name is Matyas Marek; I am a 24-year-old International Master of Chess from the Czech Republic. Currently, I am studying in the US pursuing a doctorate degree in bioinformatics.</p>

        <h2>Playing Experience</h2>
        <p>I have played chess since I was 5. I reached the IM title when I was 16 years old. I have played in countless tournaments, including World and European youth chess championships. My most significant achievement was 6th place at the World Youth Chess Championship under 18 in 2015.</p>

        <h2>Teaching Experience</h2>
        <p>Currently, I am teaching a few students around my hometown in the Czech Republic; I also have a few students in the US. I have been teaching chess for 3 years.</p>

        <h2>Teaching Methodology</h2>
        <p>Since chess is a very complex game, I try to teach all aspects of chess. My standard lessons usually focus on improving positional play by analyzing strong players' games or your games, solving puzzles to improve tactical spotting, and working on endgame technique. Additionally, I like to practice my students' skills closely related to chess, such as memory and problem-solving.</p>
        
        <button onclick="window.open('https://wa.me/60126589098', '_blank')">Contact Me</button>
        <button onclick="window.history.back()">Back</button>
    `,
    3: `
        <h1>WGM Maryana Huda</h1>
        <img src="../image/coach/maryana.jpeg" alt="WGM Maryana Huda">

        <h2 class="align-left">Location</h2>
        <p>Morshyn, Ukraine</p>

        <h2 class="align-left">Languages</h2>
        <p>Spanish</p>

        <h2 class="align-left">Rating</h2>
        <p>FIDE: 2179</p>

        <h2 class="align-left">Hourly Rate</h2>
        <p>20 USD/hour | Package: 75 USD for 5 hours</p>

        <h2>About Me</h2>
        <p>I am an International Women Grandmaster and National Master from Ukraine. I have been a professional chess coach and a licensed FIDE Trainer since 2022.</p>
        <p>In addition to my coaching, I hold a Master’s degree in English language and have experience in various languages including Ukrainian, Russian, English, Spanish, and Catalan.</p>
        <p>I come from the Ukrainian resort city of Morshyn, in the Lviv region.</p>

        <h2>Playing Experience</h2>
        <p>As a player, I have earned bronze medals in the Ukraine championships (U20 and rapid among women in 2015) and have a national Ukrainian rating of 2283. I have also won and medaled in many national and international tournaments.</p>

        <h2>Teaching Experience</h2>
        <p>I have been coaching since 2006 in Children's and Youth Sports Schools, along with other local schools. I also provide online coaching for all levels. I have a proven track record of success with students, both children and adults, helping them improve their tournament results and understanding of chess.</p>

        <h2>Other Experiences</h2>
        <p>I have created educational chess content, including video courses such as "How to Find the Next Move" and "How to Read Opponent's Mind," available on Udemy. I also have experience as a chess streamer and blogger.</p>
        <p>Find my video courses here: 
        <ul>
            <li><a href="https://www.udemy.com/course/how-to-find-the-next-move">How to Find the Next Move</a></li>
            <li><a href="https://www.udemy.com/course/how-to-read-opponents-mind">How to Read Opponent's Mind</a></li>
        </ul>
        </p>

        <h2>Best Skills</h2>
        <p>My strengths include chess analytical skills, understanding openings, middle games, endgames, tactics, calculation, positional understanding, and strategy. I provide thorough and detailed explanations, preparation for tournaments, and guidance in developing your own playing style and correcting mistakes.</p>

        <h2>Teaching Methodology</h2>
        <p>I offer lessons in English, Spanish, Russian, Ukrainian, and Catalan. I tailor my lessons to each student’s level, offering a personalized approach. Lessons can be conducted on various platforms such as chess.com, ICC, or Skype, and can include detailed analysis, opening studies, strategy, and psychological preparation.</p>
        <p>Discounts are available for regular students, and I focus on preparing my students as professionals, working step by step to achieve their goals.</p>

        <button onclick="window.open('https://wa.me/60126589098', '_blank')">Contact Me</button>
        <button onclick="window.history.back()">Back</button>
    `,
    4: `
        <h1>FM Roman Aukhatov</h1>
        <img src="../image/coach/roman.jpeg" alt="FM Roman Aukhatov">

        <h2 class="align-left">Location</h2>
        <p>Sverdlovsk region, Ekaterinburg, Russia</p>

        <h2 class="align-left">Languages</h2>
        <p>Russian, English (US)</p>

        <h2 class="align-left">Rating</h2>
        <p>FIDE: 2303</p>
        <p>Peak Rating: 2454</p>
        <p>Current Rating: 2280</p>
        <p>Blitz Rating: 2462</p>
        <p>Rapid Rating: 2107</p>

        <h2 class="align-left">Hourly Rate</h2>
        <p>1500 RUR / 16 EUR / 17 USD</p>

        <h2>About Me</h2>
        <p class="align-center">23 years old. Programmer student, chess player, and coach.</p>
        <p class="align-center">Genius is 99% hard work and 1% inspiration</p>

        <h2>Playing Experience</h2>
        <p>I have been playing chess for 11 years. During this time, I have achieved the following accomplishments:</p>
        <ul class="align-left">
            <li>1st place - Sverdlovsk Region Championship among boys under 17 (2015)</li>
            <li>1st place - Open Team Championship of Sverdlovsk Region in Rapid Chess (Aramil, 2016)</li>
            <li>1st place - Open Team Championship of Sverdlovsk Region in Rapid Chess (Aramil, 2018)</li>
            <li>1st place - Team Championship of Sverdlovsk Region in Chess among boys and girls under 19 (Nizhny Tagil, 2016)</li>
            <li>1st place - Rural Team Championship of Sverdlovsk Region (Irbit, 2015)</li>
            <li>1st place - Sverdlovsk Region Individual Championship among small towns in Chess (Rezh, 2016)</li>
            <li>1st place - Sverdlovsk Region Individual Championship among small towns in Chess (Rezh, 2017)</li>
            <li>1st place - 6th Stage of the Russian Chess Cup "L. Polugaevsky Memorial" (among boys) (Samara, 2019)</li>
            <li>1st place - V Summer Youth Spartakiad of Russia 2021</li>
            <li>2nd place - Ural Chess Festival 2017 (SKB-Contour Prizes)</li>
            <li>2nd place - All-Russian Individual and Team Competitions among Students Living in Rural Areas (Kinel-Cherkassy, 2016)</li>
            <li>2nd place - All-Russian Individual and Team Competitions among Students Living in Rural Areas (Samara Region, 2017)</li>
            <li>2nd place - Fischer Random Chess Tournament (2023)</li>
            <li>2nd place - Ekaterinburg Chess Composition Solving Championship</li>
            <li>2nd place - Team Championship of Sverdlovsk Region among small towns in Chess (Rezh, 2016)</li>
            <li>3rd place - Open Team Championship of Sverdlovsk Region in Rapid Chess (Aramil, 2017)</li>
            <li>3rd place - Ural Federal District Championship (2017)</li>
        </ul>

        <h2>Teaching Experience</h2>
        <p>I have been participating in tournaments since the age of 12 and have been coaching children and adults for over 2 years.</p>

        <h2>Best Skills</h2>
        <p>Ability to identify weaknesses; good positional understanding.</p>

        <h2>Teaching Methodology</h2>
        <p>Individual approach to every student; eliminating weaknesses; combining theoretical material with practical exercises.</p>

        <button onclick="window.open('https://wa.me/60126589098', '_blank')">Contact Me</button>
        <button onclick="window.history.back()">Back</button>

    `,
    5: `
        <h1>GM Shahin Lorparizangeneh</h1>
        <img src="../image/coach/shahin.jpeg" alt="GM Shahin Lorparizangeneh">

        <h2 class="align-left">Location</h2>
        <p>Esfahan, Iran</p>

        <h2 class="align-left">Languages</h2>
        <p>Persian</p>

        <h2 class="align-left">Rating</h2>
        <p>FIDE: 2473</p>
        <p>Peak Rating: 2916</p>
        <p>Current Rating: 2635</p>

        <h2 class="align-left">Hourly Rate</h2>
        <p>From 40 USD</p>

        <h2>About Me</h2>
        <p>Hi everyone! I am GM Shahin Lorparizangeneh from Iran. I am 22 years old and hold a bachelor's degree in law. Chess is all about discipline and improving your personality!</p>
        <p>Contact me at: <a href="mailto:shahinlorpari@yahoo.com">shahinlorpari@yahoo.com</a></p>

        <h2>Playing Experience</h2>
        <p>I am a five-time Asian champion, world youth bronze medalist, U18 world bronze medalist, and a member of the Iranian national team at the 2016 Baku Olympiad. I have won many international awards and honors throughout my chess career.</p>

        <h2>Teaching Experience</h2>
        <p>I have been a chess coach since 2015, offering chess lessons with the best conditions. My specialty lies in openings and middle game strategies, focusing on deep concepts and techniques.</p>

        <h2>Other Experiences</h2>
        <p class="align-center">FIDE ID: 12521604</p>

        <h2>Best Skills</h2>
        <p>My strongest areas are openings, chess psychology, and strategic concepts. I approach chess with passion and energy, striving to instill the same in my students.</p>

        <h2>Teaching Methodology</h2>
        <p>My teaching style is simple but strong, delivered with passion and a lot of energy. I focus on instilling deep strategic understanding in my students while maintaining a fun and engaging learning environment.</p>

        <button onclick="window.open('https://wa.me/60126589098', '_blank')">Contact Me</button>
        <button onclick="window.history.back()">Back</button>
    `,
    6: `
        <h1>FM Walter Cuevas</h1>
        <img src="../image/coach/walter.jpeg" alt="FM Walter Cuevas">

        <h2 class="align-left">Location</h2>
        <p>Santiago, Chile</p>

        <h2 class="align-left">Languages</h2>
        <p>Spanish</p>

        <h2 class="align-left">Rating</h2>
        <p>FIDE: 2300</p>
        <p>Peak Rating: 2306</p>
        <p>Current Rating: 2215</p>
        <p>Blitz Rating: 2250</p>

        <h2 class="align-left">Hourly Rate</h2>
        <p>(Individual or group) Contact me, everything depends on your goals</p>

        <h2>About Me</h2>
        <p>My name is Walter Cuevas, I am 41 years old, and I live in Santiago, Chile. I have over 10 years of experience teaching chess, especially to university students and young people.</p>
        <p>I have served as Treasurer, Director, and Vice President of the Chilean Chess Club from 2010-2015, and currently, I am a member of the Chilean Chess Club.</p>
        <p>Other areas of expertise include:</p>
        <ul class="align-left">
            <li>Certified in the 5 Disciplines of Innovation by SRI International</li>
            <li>Accountant with a diploma in Modern Management</li>
        </ul>
        <p>Other hobbies include running, climbing, hiking, and football.</p>
        <p>Email: <a href="mailto:Ajedrezavanzado@gmail.com">Ajedrezavanzado@gmail.com</a></p>
        <p>Phone: +56 9 99819272</p>

        <h2>Playing Experience</h2>
        <p>I am known as "Waltereador" among my chess friends for my ability to turn around critical games, although many are played on the edge. Here’s a video about my game style: <a href="https://youtu.be/hG26ei4-lVU">Watch here</a></p>
        <p>I am a FIDE Master since 2009 and a FIDE Certified Coach since 2015. I have experience developing tournaments and teaching this sport to many new players.</p>
        <p>My FIDE profile: <a href="https://ratings.fide.com/profile/3405028">FIDE Profile</a></p>
        <p>I regularly participate in team tournaments, company tournaments, and Chilean semi-finals, reaching two tough finals between 2005 and 2019. I also participate in international tournaments in Argentina, Uruguay, Brazil, and Spain.</p>
        <p>Some blitz games for fun, playing against strong champions of Chile:
        <ul>
            <li><a href="https://youtu.be/ZoK86YjjeAQ?t=2">GM Cristobal Henriquez</a></li>
            <li><a href="https://youtu.be/b7cNwiMbxxs?t=1">MI Matias Perez</a></li>
        </ul>
        </p>

        <h2>Teaching Experience</h2>
        <p>I started teaching chess in 2005 with a project at the National Institute in Chile. Since then, I have taught chess at universities and professional institutes, with 15 years of experience and over 500 students.</p>

        <h2>Other Experiences</h2>
        <p>I enjoy commenting on games and creating historical records:
        <ul>
            <li>Chess Olympiad Chilean Team Comments 2010: <a href="https://www.youtube.com/watch?v=kQ_SaP-e2ek">Watch here</a></li>
            <li>Final U20 Comments Chile 2012: <a href="https://www.youtube.com/watch?v=AnhDa4uYBgs">Watch here</a></li>
            <li>Chess Neuron Gym Event: <a href="https://www.youtube.com/watch?v=lVrXnbjPRMk">Watch here</a></li>
        </ul>
        </p>
        <p>More historical comments on my blog: <a href="http://revistadeajedrez.blogspot.com/">Chess Blog</a></p>

        <h2>Best Skills</h2>
        <p>Among my skills, I am a good listener, a constant source of motivation, rigorous, tolerant, and versatile. I am always very positive.</p>
        <p>My "Immortal Game": <a href="https://www.youtube.com/watch?v=SLbZCopuLn8">Watch here</a></p>

        <h2>Teaching Methodology</h2>
        <p>Thanks to the support of Lichess, I keep in contact with all my students and evaluate their online tournament games for continuous improvement. Many of them participate in private groups.</p>

        <button onclick="window.open('https://wa.me/60126589098', '_blank')">Contact Me</button>
        <button onclick="window.history.back()">Back</button>

    `,
    7: `
        <h1>IM Armin Juhasz</h1>
        <img src="../image/coach/armin.jpeg" alt="IM Armin Juhasz">

        <h2 class="align-left">Location</h2>
        <p>Budapest, Hungary</p>

        <h2 class="align-left">Languages</h2>
        <p>Hungarian</p>

        <h2 class="align-left">Rating</h2>
        <p>FIDE: 2391</p>

        <h2 class="align-left">Hourly Rate</h2>
        <p>50 USD for a private lesson</p>

        <h2>About Me</h2>
        <p>I am a 26-year-old International Master from Budapest, Hungary. I love helping people learn and improve their chess. I am a professional chess coach and run my own chess school, Centre Chess School.</p>
        <p>Link to my first opening book: <a href="https://thinkerspublishing.com/product/1-d4-the-chess-bible-mastering-queens-pawn-structures/">1.d4! The Chess Bible - Mastering Queen's Pawn Structures</a></p>
        <p>Link to my second book: <a href="https://thinkerspublishing.com/product/sharpen-up-your-chess-boost-your-chess-results/">Sharpen Up Your Chess - Boost Your Chess Results</a></p>

        <h2>Playing Experience</h2>
        <p>Best FIDE rating: 2424</p>
        <p>International Master since 2017</p>
        <p>Silver medalist in the European Youth Team Championship (2016)</p>
        <p>U16 Italian Team Champion (2014)</p>
        <p>Nine-time Hungarian Youth Champion</p>

        <h2>Teaching Experience</h2>
        <p>FIDE Trainer</p>
        <p>Coaches young players, including one World Youth Championship gold medalist and one bronze medalist.</p>
        <p>Author of <i>1.d4! The Chess Bible - Mastering Queen's Pawn Structures</i> and <i>Sharpen Up Your Chess</i></p>

        <h2>Other Experiences</h2>
        <p>Read the ChessBase article about me: <a href="https://en.chessbase.com/post/europe-s-youngest-fide-trainer-im-armin-juhasz">Europe's Youngest FIDE Trainer - IM Armin Juhasz</a></p>

        <h2>Best Skills</h2>
        <p>My teaching method is inspirational, fun, and exciting. I keep my lessons engaging and effective for students of all levels.</p>

        <h2>Teaching Methodology</h2>
        <p>I prepare my own teaching materials and demonstrate specific motifs using recent examples. It is part of my job to purchase and study new opening books, and I often spot mistakes in them. This gives me and my students an edge in games.</p>

        <button onclick="window.open('https://wa.me/60126589098', '_blank')">Contact Me</button>
        <button onclick="window.history.back()">Back</button>

    `,
    8: `
        <h1>GM Marin Bosiocic</h1>
        <img src="../image/coach/marin.jpeg" alt="GM Marin Bosiocic">

        <h2 class="align-left">Location</h2>
        <p>Rijeka, Croatia</p>

        <h2 class="align-left">Languages</h2>
        <p>Croatian</p>

        <h2 class="align-left">Rating</h2>
        <p>Peak Rating: 2693</p>

        <h2 class="align-left">Hourly Rate</h2>
        <p>55€/1 hour; 500€/10 hours</p>
        <p>Email: <a href="mailto:marin.bosiocic@gmail.com">marin.bosiocic@gmail.com</a></p>

        <h2>About Me</h2>
        <p>I am Grandmaster Marin Bosiocic from Croatia, born in 1988. I graduated from the Faculty of Economics in Rijeka, Croatia, in 2013.</p>

        <h2>Playing Experience</h2>
        <p>I have been a Grandmaster since 2008. My peak rating was 2648. My top achievements include being the Croatian National Champion in 2017 and 2019, a gold medalist on the second board in the European Team Championship in 2017 in Greece, and a member of the National team on the second board.</p>
        <p>Some of my tournament wins include the Trieste Open, Split Open, St. Veit Open (four times), and second place in the Tournament of Peace in Zagreb, behind Ivanchuk.</p>

        <h2>Teaching Experience</h2>
        <p>I have about ten years of teaching experience.</p>

        <h2>Other Experiences</h2>
        <p>In my free time, I enjoy sports, especially swimming, running, and going to the gym. I also worked for one year in an insurance company.</p>

        <h2>Best Skills</h2>
        <p>I am still an active player with extensive playing experience. In addition to working on pure chess skills, I focus on motivating my students and adapting my courses to their existing knowledge and playing style.</p>

        <h2>Teaching Methodology</h2>
        <p>At the beginning of each training session, I analyze the knowledge of my student in a specific field. My primary goals are to study their games, identify their mistakes and weaknesses, and create a teaching plan to address these areas.</p>
        <p>My lessons are conducted via VOIP client (Skype) and typically include:</p>
        <ul class="align-left">
            <li>Analysis of your games to identify mistakes and key weaknesses/strengths</li>
            <li>Analysis of strong games to understand the thought process of top players</li>
            <li>Exercises to assess understanding of themes discussed during lessons</li>
            <li>Theory tailored to the student's style and knowledge, with a focus on basic plans and ideas in their preferred openings</li>
        </ul>
        <p>If you are interested, feel free to contact me at <a href="mailto:marin.bosiocic@gmail.com">marin.bosiocic@gmail.com</a></p>

        <button onclick="window.open('https://wa.me/60126589098', '_blank')">Contact Me</button>
        <button onclick="window.history.back()">Back</button>

    `,
    9: `
        <h1>FM Daniel Kozusek</h1>
        <img src="../image/coach/daniel.jpeg" alt="FM Daniel Kozusek">

        <h2 class="align-left">Location</h2>
        <p>United Kingdom</p>

        <h2 class="align-left">Languages</h2>
        <p>English (US)</p>

        <h2 class="align-left">Rating</h2>
        <p>FIDE: 2365</p>
        <p>Peak Rating: 2502</p>
        <p>Current Rating: 2454</p>

        <h2 class="align-left">Hourly Rate</h2>
        <p>£45/hour</p>

        <h2>About Me</h2>
        <p>Hey there, I'm Daniel Kozusek, a 24-year-old chess coach based in Wales. With a background in sports psychology and the title of FIDE Master (FM) under my belt, I'm passionate about helping chess players of all levels enhance their skills and reach new heights.</p>
        <p>I am the reigning Welsh champion in classical, rapid, and blitz formats, bringing a wealth of experience to my coaching sessions.</p>
        <p>Listen to my chat on the Average Joes Chess Podcast about the importance of setting the right goals: <a href="https://spoti.fi/3wkq4i9">Listen here</a></p>

        <h2>Playing Experience</h2>
        <p>I have been playing chess since I was five and have competed in numerous world and European championships. I continue to strive for improvement, having achieved success in various prestigious tournaments. Check out my notable accomplishments on <a href="https://chess.com/member/chesss1r">Chess.com</a>.</p>
        <p>My FIDE profile: <a href="https://ratings.fide.com/profile/349500">FIDE Profile</a></p>

        <h2>Teaching Experience</h2>
        <p>Over the past 10 years, I have worked with students at all levels, guiding five to national championships and helping others achieve the titles of FIDE Master (FM) and Women's FIDE Master (WFM).</p>
        <p>I have coached chess enthusiasts from over 20 countries, and I continue to unlock the potential within each student, fostering a global chess community.</p>

        <h2>Other Experiences</h2>
        <p>As a qualified Sports Psychology expert, I help chess players with goal-setting, concentration, and other psychological challenges. My dissertation explored the usage and perceived efficacy of psychological skills among FIDE-titled and amateur players.</p>

        <h2>Best Skills</h2>
        <p>My coaching focuses on simplifying complex thinking processes, identifying areas for improvement through careful analysis of games, and inspiring my students to achieve their potential.</p>

        <h2>Teaching Methodology</h2>
        <p>I create a supportive and personalized learning environment tailored to your needs. By analyzing your games, we gain valuable insights and foster self-awareness, critical thinking, and mental resilience. My goal is to help you unlock your full potential in chess.</p>

        <button onclick="window.open('https://wa.me/60126589098', '_blank')">Contact Me</button>
        <button onclick="window.history.back()">Back</button>

    `
};

const competitionDatabase = {
    1: `
        <h1>19th IGB Malaysia Chess Festival 2024</h1>
        <img src="../image/competition/1.avif" alt="19th IGB Malaysia Chess Festival 2024">
        <p>Location: Malaysia, Kuala Lumpur</p>
        <p>Date: August 10 - August 18, 2024</p>
        <p>Registration Fee: 150 MYR</p>
        <p>Time: 9:00 AM - 6:00 PM daily</p>
        <p class="align-left">Top 3 Prizes:</p>
        <ul class="align-left">
            <li>1st Place: 10,000 MYR + Trophy</li>
            <li>2nd Place: 5,000 MYR</li>
            <li>3rd Place: 2,500 MYR</li>
        </ul>
        <p>Description: One of the largest and most prestigious chess festivals in Malaysia, attracting international players across multiple categories including classical, rapid, and blitz tournaments.</p>
        <button onclick="window.open('https://chessclicks.com/', '_blank')">Register Here</button>
        <button onclick="window.history.back()">Back</button>
    `,
    2: `
        <h1>HK-DB Monthly International Open</h1>
        <img src="../image/competition/2.avif" alt="HK-DB Monthly International Open">
        <p>Location: Hong Kong, Discovery Bay</p>
        <p>Date: September 5, 2024</p>
        <p>Registration Fee: 100 HKD</p>
        <p>Time: 10:00 AM - 5:00 PM</p>
        <p class="align-left">Top 3 Prizes:</p>
        <ul class="align-left">
            <li>1st Place: 8,000 HKD</li>
            <li>2nd Place: 4,000 HKD</li>
            <li>3rd Place: 2,000 HKD</li>
        </ul>
        <p>Description: A monthly international open chess competition that draws top talent from across the region, offering intense competition in a scenic venue.</p>
        <button onclick="window.open('https://chessclicks.com/', '_blank')">Register Here</button>
        <button onclick="window.history.back()">Back</button>
    `,
    3: `
        <h1>The Rooky</h1>
        <img src="../image/competition/3.avif" alt="The Rooky">
        <p>Location: Bangkok, Hollywood</p>
        <p>Date: October 12 - October 14, 2024</p>
        <p>Registration Fee: 2000 THB</p>
        <p>Time: 8:30 AM - 7:00 PM daily</p>
        <p class="align-left">Top 3 Prizes:</p>
        <ul class="align-left">
            <li>1st Place: 150,000 THB</li>
            <li>2nd Place: 100,000 THB</li>
            <li>3rd Place: 50,000 THB</li>
        </ul>
        <p>Description: A unique tournament held in a blend of Thai and international culture settings. Known for its entertainment value alongside competitive chess.</p>
        <button onclick="window.open('https://chessclicks.com/', '_blank')">Register Here</button>
        <button onclick="window.history.back()">Back</button>
    `,
    4: `
        <h1>Merdeka Fide Rated</h1>
        <img src="../image/competition/4.avif" alt="Merdeka Fide Rated">
        <p>Location: Malaysia, Aeon Hall</p>
        <p>Date: August 25, 2024</p>
        <p>Registration Fee: 120 MYR</p>
        <p>Time: 9:00 AM - 5:30 PM</p>
        <p class="align-left">Top 3 Prizes:</p>
        <ul class="align-left">
            <li>1st Place: 4,000 MYR</li>
            <li>2nd Place: 2,500 MYR</li>
            <li>3rd Place: 1,000 MYR</li>
        </ul>
        <p>Description: A FIDE-rated tournament held during Malaysia's Merdeka celebrations. The event attracts local and international players, boosting their FIDE rankings.</p>
        <button onclick="window.open('https://chessclicks.com/', '_blank')">Register Here</button>
        <button onclick="window.history.back()">Back</button>
    `,
    5: `
        <h1>WP Kuala Lumpur Open Circuit</h1>
        <img src="../image/competition/5.avif" alt="WP Kuala Lumpur Open Circuit">
        <p>Location: Malaysia, Kuala Lumpur</p>
        <p>Date: November 3 - November 5, 2024</p>
        <p>Registration Fee: 180 MYR</p>
        <p>Time: 10:00 AM - 6:00 PM daily</p>
        <p class="align-left">Top 3 Prizes:</p>
        <ul class="align-left">
            <li>1st Place: 6,000 MYR</li>
            <li>2nd Place: 3,000 MYR</li>
            <li>3rd Place: 1,500 MYR</li>
        </ul>
        <p>Description: A highly anticipated open circuit event in Kuala Lumpur, part of a larger series of tournaments that run throughout the year.</p>
        <button onclick="window.open('https://chessclicks.com/', '_blank')">Register Here</button>
        <button onclick="window.history.back()">Back</button>
    `,
    6: `
        <h1>16th KCM Master</h1>
        <img src="../image/competition/6.avif" alt="16th KCM Master">
        <p>Location: Malaysia, Hotel Nexus</p>
        <p>Date: December 10 - December 12, 2024</p>
        <p>Registration Fee: 200 MYR</p>
        <p>Time: 9:00 AM - 7:00 PM daily</p>
        <p class="align-left">Top 3 Prizes:</p>
        <ul class="align-left">
            <li>1st Place: 10,000 MYR</li>
            <li>2nd Place: 5,000 MYR</li>
            <li>3rd Place: 2,500 MYR</li>
        </ul>
        <p>Description: The KCM Master tournament is a major chess event in Malaysia, featuring elite players competing in a luxurious venue.</p>
        <button onclick="window.open('https://chessclicks.com/', '_blank')">Register Here</button>
        <button onclick="window.history.back()">Back</button>
    `,
    7: `
        <h1>Merdeka Chess</h1>
        <img src="../image/competition/7.avif" alt="Merdeka Chess">
        <p>Location: Malaysia, U Sentral</p>
        <p>Date: August 31, 2024</p>
        <p>Registration Fee: 100 MYR</p>
        <p>Time: 8:00 AM - 4:00 PM</p>
        <p class="align-left">Top 3 Prizes:</p>
        <ul class="align-left">
            <li>1st Place: 3,000 MYR</li>
            <li>2nd Place: 1,500 MYR</li>
            <li>3rd Place: 800 MYR</li>
        </ul>
        <p>Description: Celebrating Malaysia's Independence, this tournament provides a competitive platform for local talents and international challengers alike.</p>
        <button onclick="window.open('https://chessclicks.com/', '_blank')">Register Here</button>
        <button onclick="window.history.back()">Back</button>
    `,
    8: `
        <h1>1st Charity Chess Championship 2024</h1>
        <img src="../image/competition/8.avif" alt="1st Charity Chess Championship 2024">
        <p>Location: Malaysia, MesaMall Nilai</p>
        <p>Date: March 15, 2024</p>
        <p>Registration Fee: 80 MYR</p>
        <p>Time: 10:00 AM - 5:00 PM</p>
        <p class="align-left">Top 3 Prizes:</p>
        <ul class="align-left">
            <li>1st Place: 2,000 MYR (donated to charity)</li>
            <li>2nd Place: 1,000 MYR (donated to charity)</li>
            <li>3rd Place: 500 MYR (donated to charity)</li>
        </ul>
        <p>Description: A charity-driven event, combining the passion for chess with community support. A mix of competitive play and philanthropy.</p>
        <button onclick="window.open('https://chessclicks.com/', '_blank')">Register Here</button>
        <button onclick="window.history.back()">Back</button>
    `,
    9: `
        <h1>2024 3rd Mytown KL</h1>
        <img src="../image/competition/9.avif" alt="2024 3rd Mytown KL">
        <p>Location: Malaysia, My Town Mall</p>
        <p>Date: June 12, 2024</p>
        <p>Registration Fee: 120 MYR</p>
        <p>Time: 9:00 AM - 5:00 PM</p>
        <p class="align-left">Top 3 Prizes:</p>
        <ul class="align-left">
            <li>1st Place: 4,000 MYR</li>
            <li>2nd Place: 2,500 MYR</li>
            <li>3rd Place: 1,000 MYR</li>
        </ul>
        <p>Description: A bustling chess competition held in a popular mall in Kuala Lumpur. Known for its vibrant atmosphere and challenging rounds.</p>
        <button onclick="window.open('https://chessclicks.com/', '_blank')">Register Here</button>
        <button onclick="window.history.back()">Back</button>
    `
};


// Call the function to display the appropriate item
displayItem();