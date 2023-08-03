// database for questions
let questions = [
    {
        topic: "music",
        questions: [
            {
                question: "Who is known as the 'King of Pop'?",
                answer: "Michael Jackson",
                wrongAnswers: ["Elvis Presley", "Madonna", "Prince"],
            },
            {
                question: "Which band released the album 'Dark Side of the Moon'?",
                answer: "Pink Floyd",
                wrongAnswers: ["The Beatles", "Led Zeppelin", "Queen"],
            },
            {
                question: "Who is the lead vocalist of Queen?",
                answer: "Freddie Mercury",
                wrongAnswers: ["Mick Jagger", "David Bowie", "Elton John"],
            },
            {
                question: "Which musical instrument has black and white keys?",
                answer: "Piano",
                wrongAnswers: ["Guitar", "Drums", "Saxophone"],
            },
            {
                question: "What genre of music did Bob Marley popularize?",
                answer: "Reggae",
                wrongAnswers: ["Jazz", "Hip Hop", "Country"],
            },
            {
                question: "Who is considered the 'Father of Rock and Roll'?",
                answer: "Chuck Berry",
                wrongAnswers: ["Elvis Presley", "Little Richard", "Buddy Holly"],
            },
            {
                question: "Which artist released the album 'Thriller'?",
                answer: "Michael Jackson",
                wrongAnswers: ["Madonna", "Prince", "David Bowie"],
            },
            {
                question: "What is the highest male singing voice?",
                answer: "Tenor",
                wrongAnswers: ["Baritone", "Bass", "Alto"],
            },
            {
                question: "Which classical composer was deaf in his later years?",
                answer: "Ludwig van Beethoven",
                wrongAnswers: ["Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Frédéric Chopin"],
            },
            {
                question: "Which country is the origin of the flamenco music style?",
                answer: "Spain",
                wrongAnswers: ["Brazil", "Argentina", "Italy"],
            },
            {
                question: "Who sang the hit song 'Bohemian Rhapsody'?",
                answer: "Queen",
                wrongAnswers: ["The Beatles", "Led Zeppelin", "Pink Floyd"],
            },
            {
                question: "What is the largest member of the violin family?",
                answer: "Double Bass",
                wrongAnswers: ["Cello", "Viola", "Violin"],
            },
            {
                question: "Which rock band is known for their song 'Stairway to Heaven'?",
                answer: "Led Zeppelin",
                wrongAnswers: ["The Rolling Stones", "The Who", "Deep Purple"],
            },
            {
                question: "Who is the 'Queen of Pop'?",
                answer: "Madonna",
                wrongAnswers: ["Britney Spears", "Lady Gaga", "Janet Jackson"],
            },
            {
                question: "What is the main material used in making a flute?",
                answer: "Wood",
                wrongAnswers: ["Metal", "Plastic", "Bamboo"],
            },
        ],
    },
    {
        topic: "art",
        questions: [
            {
                question: "Who painted the Mona Lisa?",
                answer: "Leonardo da Vinci",
                wrongAnswers: ["Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
            },
            {
                question: "Which artist is known for his 'Campbell's Soup Cans'?",
                answer: "Andy Warhol",
                wrongAnswers: ["Claude Monet", "Salvador Dali", "Jackson Pollock"],
            },
            {
                question: "Who sculpted the 'David' statue?",
                answer: "Michelangelo",
                wrongAnswers: ["Auguste Rodin", "Pablo Picasso", "Leonardo da Vinci"],
            },
            {
                question: "Which Dutch painter is famous for 'The Starry Night'?",
                answer: "Vincent van Gogh",
                wrongAnswers: ["Rembrandt", "Johannes Vermeer", "Paul Cézanne"],
            },
            {
                question: "What art movement did Salvador Dali belong to?",
                answer: "Surrealism",
                wrongAnswers: ["Impressionism", "Cubism", "Realism"],
            },
            {
                question: "Who painted 'The Scream'?",
                answer: "Edvard Munch",
                wrongAnswers: ["Henri Matisse", "Gustav Klimt", "Georges Seurat"],
            },
            {
                question:
                    "Which Italian artist painted the ceiling of the Sistine Chapel?",
                answer: "Michelangelo",
                wrongAnswers: ["Raphael", "Leonardo da Vinci", "Caravaggio"],
            },
            {
                question: "Which artist is known for his 'Water Lilies' series?",
                answer: "Claude Monet",
                wrongAnswers: ["Pablo Picasso", "Jackson Pollock", "Vincent van Gogh"],
            },
            {
                question: "Who created the sculpture 'The Thinker'?",
                answer: "Auguste Rodin",
                wrongAnswers: ["Pablo Picasso", "Henri Matisse", "Gustav Klimt"],
            },
            {
                question: "Which art movement did Pablo Picasso co-found?",
                answer: "Cubism",
                wrongAnswers: ["Impressionism", "Surrealism", "Fauvism"],
            },
            {
                question: "In which century did the Renaissance period begin?",
                answer: "15th century",
                wrongAnswers: ["14th century", "16th century", "17th century"],
            },
            {
                question: "Who painted the 'Girl with a Pearl Earring'?",
                answer: "Johannes Vermeer",
                wrongAnswers: ["Rembrandt", "Claude Monet", "Vincent van Gogh"],
            },
            {
                question: "Which artist is known for his 'Les Demoiselles d'Avignon'?",
                answer: "Pablo Picasso",
                wrongAnswers: ["Salvador Dali", "Andy Warhol", "Jackson Pollock"],
            },
            {
                question: "What type of art is characterized by optical illusion?",
                answer: "Op Art",
                wrongAnswers: ["Abstract Art", "Surrealism", "Cubism"],
            },
            {
                question: "Who sculpted the Statue of Liberty?",
                answer: "Frédéric Auguste Bartholdi",
                wrongAnswers: ["Gustave Eiffel", "Michelangelo", "Leonardo da Vinci"],
            },
        ],
    },
    {
        topic: "history",
        questions: [
            {
                question: "Which of these countries did the Soviet Union NEVER invade?",
                answer: "Sweden",
                wrongAnswers: ["Poland", "Finland", "Afghanistan"],
            },
            {
                question: "Who was the first person to orbit the Earth?",
                answer: "Yuri Gagarin",
                wrongAnswers: ["Neil Armstrong", "John Glenn", "Valentina Tereshkova"],
            },
            {
                question: "Which of these cities was NOT founded by the Romans?",
                answer: "Alexandria",
                wrongAnswers: ["Cologne", "London", "Berlin"],
            },
            {
                question: "Where did Zoroastrianism originate?",
                answer: "Persia",
                wrongAnswers: ["India", "South America", "Egypt"],
            },
            {
                question: "Which of these writers was NOT English?",
                answer: "Oscar Wilde",
                wrongAnswers: ["Jane Austen", "Agatha Christie", "Charles Dickens"],
            },
            {
                question: "What does a dendrochronologist use to establish dates?",
                answer: "Tree rings",
                wrongAnswers: ["Solar eclipses", "Ice cores", "Carbon Isotopes"],
            },
            {
                question: "In terms of weapons, what is a pike?",
                answer: "A very long spear",
                wrongAnswers: [
                    "A spiked helmet",
                    "A trench knife",
                    "An improvised explosive device",
                ],
            },
            {
                question: "Why did whalers hunt sperm whales?",
                answer: "For oil to make candles",
                wrongAnswers: ["For meat", "For skin to make leather", "For sport"],
            },
            {
                question: "How many wives did Henry VIII have?",
                answer: "6",
                wrongAnswers: ["1", "2", "3"],
            },
            {
                question: "Which event triggered World War One?",
                answer: "The assassination of Archduke Francis Ferdinand",
                wrongAnswers: [
                    "Germany's Invasion of Poland",
                    "The sinking of Lithuania",
                    "The tsar's refusal of an offer to visit Germany",
                ],
            },
            {
                question: "What was the byzantine empire?",
                answer: "The empire founded byt Alexander the Great",
                wrongAnswers: [
                    "An alliance ruled by the Pope",
                    "A confederation of European tribes",
                    "A continuation of the Roman Empire",
                ],
            },
            {
                question:
                    "Which of the following was NOT originally invented in China?",
                answer: "Concrete",
                wrongAnswers: ["Gunpowder", "Paper Money", "Silk"],
            },
            {
                question: "What party did Margaret Thatcher lead?",
                answer: "Conservative",
                wrongAnswers: ["Labour", "Liberal", "Imperial"],
            },
            {
                question: "Who was Thomas Becket",
                answer: "Archbishop of Canterbury murdered in 1170",
                wrongAnswers: [
                    "One of the 'Big Six' English romantic poets",
                    "The richest man in England in the early 1700s",
                    "A notorious assassin of England in 1700s",
                ],
            },
            {
                question: "Which of these noble ranks is the Highest?",
                answer: "Duke",
                wrongAnswers: ["Baron", "Earl", "Marquess"],
            },
        ],
    },
];

module.exports = questions;
