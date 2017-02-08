
exports.up = function(knex, Promise) {
    return Promise.all([
      knex('contacts').insert(
        /*Start of array of data*/
        [
    {
        "id": "1",
        "prefix": "",
        "first": "Beth",
        "last": "August",
        "email": "",
        "job_title": "Regional Director"
    },
    {
        "id": "2",
        "prefix": "",
        "first": "Brett",
        "last": "Meadus",
        "email": "hunterhorn_vet@shaw.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "3",
        "prefix": "",
        "first": "Caroline",
        "last": "Auer",
        "email": "",
        "job_title": "Regional Director"
    },
    {
        "id": "4",
        "prefix": "",
        "first": "Cathy",
        "last": "Gaviller",
        "email": "cgaviller@westernvet.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "5",
        "prefix": "",
        "first": "Christy",
        "last": "Leslie",
        "email": "",
        "job_title": "Regional Director"
    },
    {
        "id": "6",
        "prefix": "",
        "first": "Jennie",
        "last": "Danyliw",
        "email": "",
        "job_title": "Regional Director"
    },
    {
        "id": "7",
        "prefix": "",
        "first": "Joanne",
        "last": "Fagnou",
        "email": "",
        "job_title": "Regional Director"
    },
    {
        "id": "8",
        "prefix": "",
        "first": "Jonathan",
        "last": "Leicht",
        "email": "",
        "job_title": "Regional Director"
    },
    {
        "id": "9",
        "prefix": "",
        "first": "Julie",
        "last": "Dwyer",
        "email": "",
        "job_title": "Regional Director"
    },
    {
        "id": "10",
        "prefix": "",
        "first": "Robert",
        "last": "Pakai",
        "email": "",
        "job_title": "Regional Director"
    },
    {
        "id": "11",
        "prefix": "",
        "first": "Ruth",
        "last": "Siddoway",
        "email": "",
        "job_title": "Regional Director"
    },
    {
        "id": "12",
        "prefix": "",
        "first": "Tracy",
        "last": "Ward",
        "email": "",
        "job_title": "Regional Director"
    },
    {
        "id": "13",
        "prefix": "",
        "first": "Alison",
        "last": "McGowen",
        "email": "amcgowen@rocketmail.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "16",
        "prefix": "",
        "first": "Allison",
        "last": "Kennedy",
        "email": "allisonkennedywsde@gmail.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "17",
        "prefix": "",
        "first": "Alysha",
        "last": "Kobow ",
        "email": "alysha.kobow@petvethospitals.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "18",
        "prefix": "",
        "first": "Andrea",
        "last": "Edwards",
        "email": "aedward@telus.net",
        "job_title": "Clinic Manager"
    },
    {
        "id": "20",
        "prefix": "",
        "first": "Carmen",
        "last": "Croce",
        "email": "carmenc79@hotmail.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "21",
        "prefix": "",
        "first": "Carol",
        "last": "Chris",
        "email": "Carol.Chris@lexingtonvets.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "23",
        "prefix": "",
        "first": "Christina",
        "last": "Hansen",
        "email": "CHansen@capitalcityvet.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "24",
        "prefix": "",
        "first": "Crystal",
        "last": "Kirkwood",
        "email": "ckirkwood83@gmail.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "25",
        "prefix": "",
        "first": "Doris",
        "last": "Ferreira  ",
        "email": "doris.ferreira@petvethospitals.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "26",
        "prefix": "",
        "first": "Christie",
        "last": "Leslie",
        "email": "LeslieC@associatevets.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "27",
        "prefix": "",
        "first": "Joanne ",
        "last": "Fagnou",
        "email": "jfagnoudvm@404vet.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "28",
        "prefix": "",
        "first": "Erin",
        "last": "Thompson",
        "email": "erin.thompson@shawnessysouthvet.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "29",
        "prefix": "",
        "first": "Glynnis",
        "last": "Robella",
        "email": "manager@duesouthah.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "31",
        "prefix": "",
        "first": "Helen",
        "last": "Davio",
        "email": "holisticvet@telus.net",
        "job_title": "Clinic Manager"
    },
    {
        "id": "32",
        "prefix": "",
        "first": "Ingrid",
        "last": "Schmid",
        "email": "ing.schmidbcah@gmail.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "35",
        "prefix": "",
        "first": "Janet",
        "last": "Murray",
        "email": "jmpets@telus.net",
        "job_title": "Clinic Manager"
    },
    {
        "id": "37",
        "prefix": "",
        "first": "Jennifer",
        "last": "Boekhout",
        "email": "jboekhout@willowdaleanimalhospital.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "38",
        "prefix": "",
        "first": "Jennifer",
        "last": "Welder",
        "email": "welderj@associatevets.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "39",
        "prefix": "",
        "first": "Jonathan",
        "last": "Leicht",
        "email": "LeichtJ@associatevets.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "40",
        "prefix": "",
        "first": "Julie",
        "last": "Dwyer",
        "email": "jdwyer@avah.on.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "41",
        "prefix": "",
        "first": "Julie",
        "last": "Lawrence ",
        "email": "lawrencej@crowfootvet.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "42",
        "prefix": "",
        "first": "Karen",
        "last": "Burton",
        "email": "kburton@bellnet.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "43",
        "prefix": "",
        "first": "Kristen",
        "last": "Talbot",
        "email": "talbotk@associatevets.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "44",
        "prefix": "",
        "first": "Kurtis",
        "last": "Wakem",
        "email": "kurt-matthewsanimalclinic@live.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "46",
        "prefix": "",
        "first": "Lindsay",
        "last": "Lord",
        "email": "lo-lindsay@hotmail.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "48",
        "prefix": "",
        "first": "Lindy",
        "last": "Martin",
        "email": "beardallanimalhospital@cogeco.net",
        "job_title": "Clinic Manager"
    },
    {
        "id": "49",
        "prefix": "",
        "first": "Lisa",
        "last": "Hallsworth",
        "email": "hallsworth.lisa@gmail.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "50",
        "prefix": "",
        "first": "Lori",
        "last": "Closs-Phillips",
        "email": "loriclossphillips@gmail.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "51",
        "prefix": "",
        "first": "Lyndsay",
        "last": "Laing",
        "email": "llaing@mayfieldvet.ab.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "52",
        "prefix": "",
        "first": "Margot",
        "last": "Harris  ",
        "email": "margot.harris@petvethospitals.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "53",
        "prefix": "",
        "first": "Maria",
        "last": "Blair",
        "email": "pretoriapethospital@bellnet.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "54",
        "prefix": "",
        "first": "Marnie",
        "last": "Beaton",
        "email": "marniebeaton@gmail.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "56",
        "prefix": "",
        "first": "Melissa",
        "last": "Mooc",
        "email": "melissa.mooc@gmail.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "58",
        "prefix": "",
        "first": "Nicole",
        "last": "Steinhubl",
        "email": "nicrvc@telus.net",
        "job_title": "Clinic Manager"
    },
    {
        "id": "59",
        "prefix": "",
        "first": "Pam",
        "last": "Dean",
        "email": "pam@masonvilleanimalhospital.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "60",
        "prefix": "",
        "first": "Sara",
        "last": "Gallant-Reeve  ",
        "email": "sara.gallant@petvethospitals.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "62",
        "prefix": "",
        "first": "Shauna",
        "last": "Bearchell",
        "email": "sbearchell@guardianvetcentre.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "63",
        "prefix": "",
        "first": "Stacey",
        "last": "Kew",
        "email": "abagael@me.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "64",
        "prefix": "",
        "first": "Stefanie",
        "last": "Blackburn",
        "email": "blackburns@associatevets.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "66",
        "prefix": "",
        "first": "Tammy",
        "last": "Hort",
        "email": "tammy.hort@horizonvet.ca",
        "job_title": "Clinic Manager"
    },
    {
        "id": "70",
        "prefix": "",
        "first": "Vicky",
        "last": "Fitzpatrick",
        "email": "info@macewanvet.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "71",
        "prefix": "",
        "first": "Wendy",
        "last": "Dow",
        "email": "management@ottawavet.com",
        "job_title": "Clinic Manager"
    },
    {
        "id": "72",
        "prefix": "Dr.",
        "first": "Alison",
        "last": "Hamilton",
        "email": "alisonhamiltondvm@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "73",
        "prefix": "Dr.",
        "first": "Allan",
        "last": "Corber",
        "email": "acorber@rogers.com ",
        "job_title": "Medical Director"
    },
    {
        "id": "74",
        "prefix": "Dr.",
        "first": "Amy",
        "last": "Waterhouse",
        "email": "awaterhouse@varsityvet.com",
        "job_title": "Medical Director"
    },
    {
        "id": "75",
        "prefix": "Dr.",
        "first": "Anja",
        "last": "Reinshagen",
        "email": "anja@redtoad.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "76",
        "prefix": "Dr.",
        "first": "Annabelle",
        "last": "Sydie-Smith",
        "email": "asydiesmith@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "77",
        "prefix": "Dr.",
        "first": "Brian",
        "last": "McBride",
        "email": "bkefamily@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "78",
        "prefix": "Dr.",
        "first": "Catherine",
        "last": "Bomben",
        "email": "kingswayah@cogeco.net",
        "job_title": "Medical Director"
    },
    {
        "id": "79",
        "prefix": "Dr.",
        "first": "Catherine",
        "last": "Miller",
        "email": "cgmdvm@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "80",
        "prefix": "Dr.",
        "first": "Cathy",
        "last": "Cruz",
        "email": "drcathycruz@me.com",
        "job_title": "Medical Director"
    },
    {
        "id": "81",
        "prefix": "Dr.",
        "first": "Cathy",
        "last": "Dick",
        "email": "cathy@countryhillsvetclinic.com",
        "job_title": "Medical Director"
    },
    {
        "id": "82",
        "prefix": "Dr.",
        "first": "Cherie",
        "last": "White",
        "email": "cwhitedvm@cogeco.net ",
        "job_title": "Medical Director"
    },
    {
        "id": "83",
        "prefix": "Dr.",
        "first": "Chris",
        "last": "Elder",
        "email": "chriselder81@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "84",
        "prefix": "Dr.",
        "first": "Colleen",
        "last": "Pratt",
        "email": "cspratt@shaw.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "85",
        "prefix": "Dr.",
        "first": "Craig",
        "last": "Prince",
        "email": "info@macewanvet.com ",
        "job_title": "Medical Director"
    },
    {
        "id": "86",
        "prefix": "Dr.",
        "first": "Danny",
        "last": "Joffe",
        "email": "joffed@associatevets.com",
        "job_title": "Medical Director"
    },
    {
        "id": "87",
        "prefix": "Dr.",
        "first": "Dave",
        "last": "Fowler",
        "email": "DFowler@guardianvetcentre.com",
        "job_title": "Medical Director"
    },
    {
        "id": "88",
        "prefix": "Dr.",
        "first": "David",
        "last": "Kirby",
        "email": "masonvillevet@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "89",
        "prefix": "Dr.",
        "first": "Debby",
        "last": "Henderson",
        "email": "dhenderson@westernvet.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "90",
        "prefix": "Dr.",
        "first": "Dennis",
        "last": "Mudde",
        "email": "dbmdvm@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "91",
        "prefix": "Dr.",
        "first": "Don",
        "last": "Zedde",
        "email": "drdzedde@shaw.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "93",
        "prefix": "Dr.",
        "first": "Donald",
        "last": "Bissonnette",
        "email": "dr.donald@petvethospitals.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "97",
        "prefix": "Dr.",
        "first": "Ed",
        "last": "Cottell",
        "email": "aussie@magma.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "98",
        "prefix": "Dr.",
        "first": "Emily",
        "last": "Ames",
        "email": "emily11ames@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "99",
        "prefix": "Dr.",
        "first": "Erica",
        "last": "Tyre",
        "email": "etyre@avah.on.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "100",
        "prefix": "Dr.",
        "first": "Eva",
        "last": "Chung",
        "email": "evachungdvm@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "101",
        "prefix": "Dr.",
        "first": "Fiona",
        "last": "Goulding",
        "email": "drdemando@telus.net",
        "job_title": "Medical Director"
    },
    {
        "id": "102",
        "prefix": "Dr.",
        "first": "Gábor",
        "last": "Magyar",
        "email": "gabormagyar@hotmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "103",
        "prefix": "Dr.",
        "first": "Hillary",
        "last": "Butler",
        "email": "habutler@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "104",
        "prefix": "Dr.",
        "first": "Iain",
        "last": "Chynoweth",
        "email": "iain.chynoweth@horizonvet.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "105",
        "prefix": "Dr.",
        "first": "Jamie",
        "last": "McGill",
        "email": "mcgill.worsley@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "108",
        "prefix": "Dr.",
        "first": "Joanne",
        "last": "Fagnou",
        "email": "jfagnoudvm@404vet.com",
        "job_title": "Medical Director"
    },
    {
        "id": "109",
        "prefix": "Dr.",
        "first": "John",
        "last": "Swatman",
        "email": "beaglevet@rogers.com",
        "job_title": "Medical Director"
    },
    {
        "id": "110",
        "prefix": "Dr.",
        "first": "Jonathan",
        "last": "Bloom",
        "email": "jpbloom@rogers.com",
        "job_title": "Medical Director"
    },
    {
        "id": "111",
        "prefix": "Dr.",
        "first": "Keith",
        "last": "Wilkinson",
        "email": "bilkovet@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "112",
        "prefix": "Dr.",
        "first": "Kelly-Leigh",
        "last": "Thomas",
        "email": "drklthomas@rogers.com",
        "job_title": "Medical Director"
    },
    {
        "id": "113",
        "prefix": "Dr.",
        "first": "Les",
        "last": "McCurdy",
        "email": "harvesthillsvet@shaw.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "114",
        "prefix": "Dr.",
        "first": "Lisa",
        "last": "Radchenko",
        "email": "lisaradchenko@hotmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "115",
        "prefix": "Dr.",
        "first": "Mark",
        "last": "Teeger",
        "email": "markteeger@rogers.com",
        "job_title": "Medical Director"
    },
    {
        "id": "116",
        "prefix": "Dr.",
        "first": "Marty",
        "last": "Lovo",
        "email": "Mrlovo@shaw.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "117",
        "prefix": "Dr.",
        "first": "Mike",
        "last": "Mossup",
        "email": "mike.mossup@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "118",
        "prefix": "Dr.",
        "first": "Pam",
        "last": "Gordey",
        "email": "pgordey@telus.net",
        "job_title": "Medical Director"
    },
    {
        "id": "119",
        "prefix": "Dr.",
        "first": "Petra",
        "last": "Warnock",
        "email": "pwarnock@capitalcityvet.com",
        "job_title": "Medical Director"
    },
    {
        "id": "120",
        "prefix": "Dr.",
        "first": "Sean",
        "last": "Walter",
        "email": "seanwalter01@rogers.com",
        "job_title": "Medical Director"
    },
    {
        "id": "121",
        "prefix": "Dr.",
        "first": "Steve",
        "last": "Davidson",
        "email": "sdavidsondvm@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "122",
        "prefix": "Dr.",
        "first": "Tara",
        "last": "Sager",
        "email": "tara.sager@shaw.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "123",
        "prefix": "Dr.",
        "first": "Teresa",
        "last": "Boughen",
        "email": "hunterhorn_vet@shaw.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "124",
        "prefix": "Dr.",
        "first": "Vanessa",
        "last": "Carl",
        "email": "drcarl@duesouthah.com",
        "job_title": "Medical Director"
    },
    {
        "id": "125",
        "prefix": "Dr.",
        "first": "Wade",
        "last": "Wright",
        "email": "wadewrightdvm@gmail.com",
        "job_title": "Medical Director"
    },
    {
        "id": "126",
        "prefix": "Dr.",
        "first": "Yanhui",
        "last": "Qi",
        "email": "holisticvet@telus.net",
        "job_title": "Medical Director"
    },
    {
        "id": "127",
        "prefix": "Dr.",
        "first": "Michael",
        "last": "Duhame",
        "email": "mduhame@willowdaleanimalhospital.com",
        "job_title": "Medical Director"
    },
    {
        "id": "128",
        "prefix": "Dr.",
        "first": "Marge",
        "last": "McIsaac",
        "email": " mmcisaac@avah.on.ca",
        "job_title": "Medical Director"
    },
    {
        "id": "129",
        "prefix": "Dr.",
        "first": "Debra",
        "last": "Bear",
        "email": "rivervet@telus.net",
        "job_title": "Medical Director"
    },
    {
        "id": "130",
        "prefix": "",
        "first": "Julie",
        "last": "Clark",
        "email": "",
        "job_title": "Clinic Manager"
    }
]
        
        /*End of insert array*/		
       )
   ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex('contacts').whereRaw('`id` <= ?', [1000]).del()
  ]);
};
