const okazMapper = {
    news: '',
    sports: '',
    economy: '',
    fashion: '',
    tourism: '',
    technology: '',
    variety: '',
    Games: '',
    investigation: '',
};

okazMapper.news = 'local'; // e
okazMapper.sports = 'sports'; // e
okazMapper.economy = 'economy'; // e
okazMapper.fashion = 'fashion';
okazMapper.tourism = 'tourism'; // e
okazMapper['people-situations'] = 'local';
okazMapper.technology = 'technology';
okazMapper.variety = 'misc'; // e
okazMapper.Games = 'Games';
okazMapper.investigation = 'local';
okazMapper['special-zones'] = 'society'; // e

const aawsatMapper = {
    first: '',
    news: '',
    economy: '',
    sport: '',
    travel: '',
    culture: '',
    health: '',
    fashion: '',
    investigation: '',
    science: '',
    issues: '',
    environment: '',
};

aawsatMapper.first = 'local';
aawsatMapper.news = 'local';
aawsatMapper.economy = 'economy';
aawsatMapper.sport = 'sports';
aawsatMapper.travel = 'tourism';
aawsatMapper.culture = 'society';
aawsatMapper.fashion = 'fashion';
aawsatMapper.investigation = 'local';
aawsatMapper.science = 'society';
aawsatMapper.issues = 'society';
aawsatMapper.environment = 'society';
aawsatMapper['information-technology'] = 'technology';
aawsatMapper.health = 'lifestyle';

export const okaz = okazMapper;
export const aawsat = aawsatMapper;
