google.charts.load('current', {packages: ['corechart', 'bar']})
google.charts.setOnLoadCallback(draw)

let $ = id => document.getElementById(id)

function base_options(vAxis, {hAxis, title}={hAxis: 'Semester', title: null}) {
    if(!title) {
        title = vAxis
    }

    return {
        title: title,
        hAxis: {
            title: hAxis,
            showTextEvery: 8,
        },
        vAxis: {
            title: vAxis,
        },
        legend: {
            position: 'none'
        },
    }
}

function base_graph(vAxis, {hAxis, title}={hAxis: 'Semester', title: null}) {
    let data = new google.visualization.DataTable()
    data.addColumn('string', 'Semester')
    data.addColumn('number', vAxis)
    return [data, base_options(vAxis, {hAxis: hAxis, title: title})]
}

function courses_per_semester() {
    let [data, opts] = base_graph('Courses offered', {title: 'Total courses offered per semester'})
    data.addRows([
        [ '2004 Fall'   , 810 ],
        [ '2005 Spring' , 829 ],
        [ '2005 Fall'   , 827 ],
        [ '2006 Spring' , 837 ],
        [ '2006 Fall'   , 838 ],
        [ '2007 Spring' , 860 ],
        [ '2007 Fall'   , 916 ],
        [ '2008 Spring' , 887 ],
        [ '2008 Fall'   , 883 ],
        [ '2009 Spring' , 863 ],
        [ '2009 Fall'   , 890 ],
        [ '2010 Spring' , 901 ],
        [ '2010 Fall'   , 880 ],
        [ '2011 Spring' , 890 ],
        [ '2011 Fall'   , 913 ],
        [ '2012 Spring' , 907 ],
        [ '2012 Fall'   , 941 ],
        [ '2013 Spring' , 930 ],
        [ '2013 Fall'   , 933 ],
        [ '2014 Spring' , 952 ],
        [ '2014 Fall'   , 936 ],
        [ '2015 Spring' , 1010 ],
        [ '2015 Fall'   , 953 ],
        [ '2016 Spring' , 952 ],
        [ '2016 Fall'   , 939 ],
        [ '2017 Spring' , 946 ],
        [ '2017 Fall'   , 944 ],
        [ '2018 Spring' , 930 ],
        [ '2018 Fall'   , 934 ],
    ])

    let chart = new google.visualization.ColumnChart($('courses_per_semester'))
    chart.draw(data, opts)
}

function stacked_subject_courses_per_semester() {
    let chart = new google.visualization.LineChart($('stacked_subject_courses_per_semester'))

    subjects = [ 'HS', 'MUS', 'THA', 'ECON', 'MATH', 'BIOL']

    let data = new google.visualization.DataTable()
    data.addColumn('string', 'Semester')
    for(subj of subjects) {
        data.addColumn('number', subj)
    }

    for(dat of COURSES_PER_SUBJECT) {
        [sem, courses] = dat
        row = [sem]
        for(subj of subjects) {
            row.push(courses[subj] || 0)
        }
        data.addRow(row)
    }
    let options = base_options('Courses offered', {
        title: 'Courses per subject per semester'
    })
    options.legend = {position: 'bottom'}
    options.height = 300
    options.chartArea = {width: '80%', height: '70%'}
    chart.draw(data, options)
}

function subject_courses_per_semester(subj) {
    let [data, opts] = base_graph(subj + ' courses')
    for(row of COURSES_PER_SUBJECT) {
        data.addRow([row[0], row[1][subj]])
    }

    let chart = new google.visualization.ColumnChart($('subject_courses_per_semester'))
    chart.draw(data, opts)
}

function corr_subject_courses_per_semester(subj) {
    let axis = subj + ' courses'
    let [data, opts] = base_graph(axis, {title: axis + ' (corrected for total uni. courses offered)'})
    for(row of COURSES_PER_SUBJECT) {
        sem = row[0]
        data.addRow([sem, row[1][subj] / COURSES_PER_SEMESTER[sem]])
    }

    let chart = new google.visualization.ColumnChart($('corr_subject_courses_per_semester'))
    chart.draw(data, opts)
}

function course_enrollments() {
    let [data, opts] = base_graph('Student-enrollments')
    data.addRows([
        [ '2004 Fall'   , 17672 ],
        [ '2005 Spring' , 16840 ],
        [ '2005 Fall'   , 18057 ],
        [ '2006 Spring' , 17013 ],
        [ '2006 Fall'   , 18459 ],
        [ '2007 Spring' , 17691 ],
        [ '2007 Fall'   , 18808 ],
        [ '2008 Spring' , 17828 ],
        [ '2008 Fall'   , 18711 ],
        [ '2009 Spring' , 18015 ],
        [ '2009 Fall'   , 19781 ],
        [ '2010 Spring' , 19152 ],
        [ '2010 Fall'   , 20337 ],
        [ '2011 Spring' , 19805 ],
        [ '2011 Fall'   , 21023 ],
        [ '2012 Spring' , 20669 ],
        [ '2012 Fall'   , 21399 ],
        [ '2013 Spring' , 20319 ],
        [ '2013 Fall'   , 21646 ],
        [ '2014 Spring' , 20812 ],
        [ '2014 Fall'   , 22234 ],
        [ '2015 Spring' , 21138 ],
        [ '2015 Fall'   , 21663 ],
        [ '2016 Spring' , 20198 ],
        [ '2016 Fall'   , 21530 ],
        [ '2017 Spring' , 20178 ],
        [ '2017 Fall'   , 21424 ],
        [ '2018 Spring' , 19899 ],
        [ '2018 Fall'   , 20513 ],
    ])
    let chart = new google.visualization.ColumnChart($('course_enrollments'))
    chart.draw(data, opts)
}

function draw() {
    courses_per_semester()
    stacked_subject_courses_per_semester()
    subject_courses_per_semester($('subject_chooser').value)
    corr_subject_courses_per_semester($('subject_chooser').value)
    course_enrollments()
}

window.addEventListener('load', e => {
    $('subject_chooser').addEventListener('change', e => {
        subject_courses_per_semester(e.target.value)
        corr_subject_courses_per_semester(e.target.value)
    })
})

SEMESTERS = [
    '2004 Fall'   ,
    '2005 Spring' ,
    '2005 Fall'   ,
    '2006 Spring' ,
    '2006 Fall'   ,
    '2007 Spring' ,
    '2007 Fall'   ,
    '2008 Spring' ,
    '2008 Fall'   ,
    '2009 Spring' ,
    '2009 Fall'   ,
    '2010 Spring' ,
    '2010 Fall'   ,
    '2011 Spring' ,
    '2011 Fall'   ,
    '2012 Spring' ,
    '2012 Fall'   ,
    '2013 Spring' ,
    '2013 Fall'   ,
    '2014 Spring' ,
    '2014 Fall'   ,
    '2015 Spring' ,
    '2015 Fall'   ,
    '2016 Spring' ,
    '2016 Fall'   ,
    '2017 Spring' ,
    '2017 Fall'   ,
    '2018 Spring' ,
    '2018 Fall'   ,
]

COURSES_PER_SEMESTER = {
    '2004 Fall'   : 810 ,
    '2005 Spring' : 829 ,
    '2005 Fall'   : 827 ,
    '2006 Spring' : 837 ,
    '2006 Fall'   : 838 ,
    '2007 Spring' : 860 ,
    '2007 Fall'   : 916 ,
    '2008 Spring' : 887 ,
    '2008 Fall'   : 883 ,
    '2009 Spring' : 863 ,
    '2009 Fall'   : 890 ,
    '2010 Spring' : 901 ,
    '2010 Fall'   : 880 ,
    '2011 Spring' : 890 ,
    '2011 Fall'   : 913 ,
    '2012 Spring' : 907 ,
    '2012 Fall'   : 941 ,
    '2013 Spring' : 930 ,
    '2013 Fall'   : 933 ,
    '2014 Spring' : 952 ,
    '2014 Fall'   : 936 ,
    '2015 Spring' : 1010,
    '2015 Fall'   : 953 ,
    '2016 Spring' : 952 ,
    '2016 Fall'   : 939 ,
    '2017 Spring' : 946 ,
    '2017 Fall'   : 944 ,
    '2018 Spring' : 930 ,
    '2018 Fall'   : 934 ,
}

AVG_STUDENTS = {
    '2004 Fall'   : 22.14536340852130,
    '2005 Spring' : 20.66257668711656,
    '2005 Fall'   : 22.23768472906404,
    '2006 Spring' : 20.62181818181818,
    '2006 Fall'   : 22.42891859052248,
    '2007 Spring' : 21.06071428571428,
    '2007 Fall'   : 21.56880733944954,
    '2008 Spring' : 20.56286043829296,
    '2008 Fall'   : 21.48220436280138,
    '2009 Spring' : 21.16921269095182,
    '2009 Fall'   : 22.58105022831050,
    '2010 Spring' : 21.54330708661417,
    '2010 Fall'   : 23.53819444444444,
    '2011 Spring' : 22.60844748858447,
    '2011 Fall'   : 23.35888888888888,
    '2012 Spring' : 23.11968680089485,
    '2012 Fall'   : 22.83778014941302,
    '2013 Spring' : 22.20655737704918,
    '2013 Fall'   : 23.50271444082519,
    '2014 Spring' : 22.11689691817215,
    '2014 Fall'   : 24.24645583424209,
    '2015 Spring' : 21.92738589211618,
    '2015 Fall'   : 23.11953041622198,
    '2016 Spring' : 21.64844587352626,
    '2016 Fall'   : 23.17545748116254,
    '2017 Spring' : 21.76699029126213,
    '2017 Fall'   : 23.06135629709365,
    '2018 Spring' : 21.77133479212253,
    '2018 Fall'   : 23.02244668911335,
}

COURSES_PER_SUBJECT = [
    [ '2004 Fall'   , {HS: 59, THA: 53, MUS: 41, MATH: 39, PE: 37, CHEM: 31,
        ECON: 31, FA: 30, BIOL: 29, USEM: 29, ENG: 27, HIST: 26, SPAN: 26, PHYS:
        24, NEJS: 23, POL: 22, BUS: 19, HBRW: 19, PSYC: 19, ANTH: 18, SOC: 16, FIN:
        14, UWS: 14, FREN: 13, PHIL: 13, AMST: 11, COSI: 10, ED: 10, HSSP: 9, COMP:
        8, JCS: 7, AAAS: 6, GER: 6, ITAL: 6, NBIO: 6, BCHM: 5, LAT: 4, LGLS: 4,
        LING: 4, ARBC: 3, CHIN: 3, JAPN: 3, JOUR: 3, NPSY: 3, RUS: 3, WMNS: 3,
        BISC: 2, CLAS: 2, ENVS: 2, PHSC: 2, YDSH: 2, BIPH: 1, CHSC: 1, COEX: 1,
        COML: 1, ECS: 1, FILM: 1, GECS: 1, GRK: 1, IECS: 1, IGS: 1, RECS: 1} ],
    [ '2005 Spring' , {HS: 60, THA: 56, MUS: 39, BIOL: 36, ECON: 35, NEJS: 34,
        PE: 33, MATH: 32, FA: 29, ENG: 28, PHYS: 27, CHEM: 25, BUS: 23, HIST: 23,
        SPAN: 23, USEM: 22, POL: 21, PSYC: 19, FIN: 18, SOC: 18, UWS: 18, PHIL: 17,
        AMST: 16, ANTH: 16, HBRW: 16, ED: 12, COSI: 10, FREN: 10, HSSP: 9, JCS: 8,
        BCHM: 6, NPSY: 6, AAAS: 5, ITAL: 5, LGLS: 5, COEX: 4, GER: 4, JOUR: 4,
        NBIO: 4, WMNS: 4, ARBC: 3, CHIN: 3, CLAS: 3, EAS: 3, ENVS: 3, GRK: 3, BISC:
        2, COML: 2, FECS: 2, IGS: 2, JAPN: 2, LAT: 2, LING: 2, RECS: 2, RUS: 2,
        YDSH: 2, BIOP: 1, BIPH: 1, COMP: 1, CONT: 1, GECS: 1, HUM: 1, IMES: 1,
        NPHY: 1, PAX: 1, PHSC: 1, REL: 1} ],
    [ '2005 Fall'   , {THA: 63, HS: 61, MUS: 41, MATH: 40, PE: 37, ECON: 34, FA:
        33, CHEM: 31, BIOL: 28, SPAN: 28, USEM: 27, NEJS: 25, ENG: 24, PHYS: 24,
        POL: 23, HIST: 22, BUS: 20, PSYC: 19, HBRW: 18, ED: 17, FIN: 17, SOC: 16,
        FREN: 15, PHIL: 14, AMST: 12, ANTH: 12, COSI: 10, UWS: 10, COMP: 8, AAAS:
        6, ITAL: 6, NBIO: 6, BCHM: 5, CHIN: 5, ENVS: 5, GER: 5, JCS: 5, ARBC: 4,
        CLAS: 4, LGLS: 4, LING: 4, GRK: 3, JAPN: 3, LAT: 3, NPSY: 3, RUS: 3, WMGS:
        3, COML: 2, HSSP: 2, RECS: 2, YDSH: 2, BCSC: 1, BIPH: 1, BISC: 1, CHSC: 1,
        COEX: 1, ECS: 1, FECS: 1, FILM: 1, GECS: 1, IGS: 1, JOUR: 1, PHSC: 1, SAL:
        1} ],
    [ '2006 Spring' , {THA: 67, HS: 66, ECON: 37, MUS: 37, PE: 36, MATH: 33,
        BIOL: 31, FA: 30, CHEM: 27, PHYS: 25, SPAN: 24, ENG: 23, HIST: 23, NEJS:
        23, BUS: 22, POL: 22, USEM: 22, FIN: 20, SOC: 19, PSYC: 17, ANTH: 16, AMST:
        15, HBRW: 15, UWS: 15, PHIL: 13, ED: 12, FREN: 12, COSI: 11, AAAS: 9, JCS:
        7, LGLS: 7, JOUR: 6, NBIO: 6, CHIN: 5, ITAL: 5, WMGS: 5, ARBC: 4, BCHM: 4,
        CLAS: 4, COEX: 4, COML: 4, GER: 4, GRK: 4, HSSP: 4, LING: 4, NPSY: 4, RUS:
        3, CHSC: 2, ENVS: 2, IGS: 2, JAPN: 2, LAT: 2, PHSC: 2, RECS: 2, REL: 2,
        SAL: 2, BIOP: 1, BIPH: 1, BISC: 1, COMP: 1, EAS: 1, ECS: 1, GECS: 1, HUM:
        1, IECS: 1, IMES: 1, LAS: 1, SECS: 1, YDSH: 1} ],
    [ '2006 Fall'   , {THA: 68, HS: 64, MUS: 41, MATH: 37, PE: 37, ECON: 34,
        SPAN: 31, FA: 29, CHEM: 28, BIOL: 27, USEM: 26, ENG: 25, POL: 25, PHYS: 23,
        NEJS: 22, PSYC: 20, BUS: 19, HBRW: 19, FIN: 18, HIST: 17, ED: 16, FREN: 16,
        SOC: 15, AMST: 14, ANTH: 12, PHIL: 12, UWS: 12, COSI: 11, COMP: 8, CHIN: 7,
        ITAL: 7, GER: 6, JAPN: 6, NBIO: 6, AAAS: 5, ENVS: 5, HRNS: 5, JOUR: 5,
        ARBC: 4, BCHM: 4, HSSP: 4, LAT: 4, LGLS: 4, LING: 4, NPSY: 4, WMGS: 4,
        COEX: 3, COML: 3, RUS: 3, BISC: 2, CLAS: 2, GRK: 2, RECS: 2, YDSH: 2, BIPH:
        1, CHSC: 1, ECS: 1, GECS: 1, IGS: 1, IMES: 1, PHSC: 1, REL: 1, SAL: 1} ],
    [ '2007 Spring' , {THA: 76, HS: 65, ECON: 41, MUS: 38, PE: 36, BIOL: 35,
        MATH: 35, FA: 30, SPAN: 30, BUS: 26, CHEM: 26, NEJS: 25, PHYS: 23, USEM:
        23, POL: 22, FIN: 21, HIST: 20, ENG: 19, UWS: 19, ANTH: 17, PSYC: 17, SOC:
        16, AMST: 15, HBRW: 15, PHIL: 15, ED: 14, FREN: 13, COSI: 10, AAAS: 7,
        CHIN: 7, BCHM: 6, NBIO: 6, ENVS: 5, HSSP: 5, ITAL: 5, JAPN: 5, LING: 5,
        WMGS: 5, ARBC: 4, COEX: 4, GRK: 4, HRNS: 4, JOUR: 4, LGLS: 4, CLAS: 3, GER:
        3, NPSY: 3, RUS: 3, BCSC: 2, IGS: 2, LAT: 2, QBIO: 2, YDSH: 2, BIOP: 1,
        BIPH: 1, BISC: 1, CHSC: 1, COML: 1, CONT: 1, CP: 1, ECS: 1, FILM: 1, GECS:
        1, HUM: 1, IECS: 1, PAX: 1, PHSC: 1, REL: 1, SAL: 1} ],
    [ '2007 Fall'   , {THA: 94, HS: 66, MUS: 52, MATH: 37, PE: 37, ECON: 35,
        SPAN: 32, USEM: 31, CHEM: 28, FA: 28, BIOL: 27, POL: 25, UWS: 25, BUS: 23,
        ENG: 23, FIN: 23, PHYS: 23, ED: 22, NEJS: 22, PSYC: 19, HIST: 18, FREN: 17,
        HBRW: 17, SOC: 16, ANTH: 13, AMST: 12, COSI: 12, PHIL: 12, AAAS: 7, CHIN:
        7, JAPN: 7, COMP: 6, ITAL: 6, NBIO: 6, BCHM: 5, ENVS: 5, GER: 5, HSSP: 5,
        LGLS: 5, LING: 5, ARBC: 4, COEX: 4, HRNS: 4, JOUR: 4, NPSY: 4, WMGS: 4,
        BISC: 3, CLAS: 3, COML: 3, LAT: 3, RUS: 3, GRK: 2, IGS: 2, RECS: 2, YDSH:
        2, BCSC: 1, BIPH: 1, CP: 1, ECS: 1, FILM: 1, GECS: 1, HUM: 1, IMES: 1,
        LALS: 1, PHSC: 1, SJSP: 1} ],
    [ '2008 Spring' , {THA: 71, HS: 68, MUS: 49, ECON: 40, PE: 34, BIOL: 31,
        MATH: 31, BUS: 30, CHEM: 30, SPAN: 29, ENG: 28, NEJS: 28, UWS: 27, FA: 25,
        POL: 25, USEM: 25, FIN: 24, PHYS: 22, HIST: 21, SOC: 21, ED: 18, PSYC: 18,
        ANTH: 16, HBRW: 14, PHIL: 13, FREN: 12, AMST: 11, COSI: 10, JAPN: 7, AAAS:
        6, CHIN: 6, NBIO: 6, WMGS: 6, BCHM: 5, CLAS: 5, ENVS: 5, JOUR: 5, LGLS: 5,
        ARBC: 4, COEX: 4, GER: 4, ITAL: 4, LING: 4, GRK: 3, HSSP: 3, NPSY: 3, RUS:
        3, CHSC: 2, HRNS: 2, IGS: 2, LAT: 2, QBIO: 2, RECS: 2, REL: 2, SAS: 2,
        YDSH: 2, BCSC: 1, BIOP: 1, BIPH: 1, BISC: 1, COML: 1, CONT: 1, FILM: 1,
        HUM: 1, PAX: 1, SECS: 1} ],
    [ '2008 Fall'   , {HS: 67, THA: 62, MUS: 50, ECON: 36, MATH: 36, PE: 35,
        HISP: 31, USEM: 31, CHEM: 30, FA: 30, ENG: 29, BIOL: 26, UWS: 25, BUS: 24,
        PHYS: 24, NEJS: 22, ED: 20, FIN: 20, HIST: 20, POL: 19, HBRW: 18, FREN: 17,
        PSYC: 17, SOC: 15, ANTH: 14, PHIL: 14, AMST: 11, COSI: 11, COMP: 8, CHIN:
        7, JAPN: 7, NBIO: 7, AAAS: 6, HRNS: 6, HSSP: 6, ITAL: 6, JOUR: 6, ARBC: 5,
        CLAS: 5, GER: 5, LGLS: 5, LING: 5, BCHM: 4, ENVS: 4, GRK: 3, LAT: 3, RUS:
        3, WMGS: 3, COEX: 2, COML: 2, FILM: 2, IGS: 2, NPSY: 2, PHSC: 2, BISC: 1,
        CHSC: 1, CP: 1, ECS: 1, GECS: 1, HUM: 1, IMES: 1, PAX: 1, RECS: 1, REL: 1,
        SAS: 1, SJSP: 1, YDSH: 1} ],
    [ '2009 Spring' , {HS: 69, THA: 63, MUS: 50, ECON: 34, PE: 34, BIOL: 31, BUS:
        31, MATH: 30, UWS: 30, FA: 29, CHEM: 28, USEM: 28, NEJS: 27, ENG: 26, HISP:
        26, FIN: 23, PHYS: 22, SOC: 21, POL: 20, ANTH: 19, ED: 19, HIST: 19, PSYC:
        16, HBRW: 14, PHIL: 13, COSI: 11, FREN: 11, AMST: 9, CHIN: 7, HSSP: 6,
        WMGS: 6, COEX: 5, ENVS: 5, LGLS: 5, LING: 5, NBIO: 5, AAAS: 4, ARBC: 4,
        BCHM: 4, GER: 4, ITAL: 4, JAPN: 4, JOUR: 4, NPSY: 4, BISC: 3, CLAS: 3, GRK:
        3, HRNS: 3, COML: 2, IGS: 2, LAT: 2, QBIO: 2, RECS: 2, RUS: 2, BIOP: 1,
        CHSC: 1, CONT: 1, ECS: 1, FILM: 1, GECS: 1, HECS: 1, IECS: 1, PAX: 1, REL:
        1} ],
    [ '2009 Fall'   , {HS: 74, THA: 71, MUS: 48, MATH: 38, ECON: 36, CHEM: 31,
        NEJS: 28, PE: 28, BIOL: 27, FA: 27, UWS: 26, ENG: 25, BUS: 24, PHYS: 24,
        POL: 24, FIN: 23, ED: 22, HIST: 22, HISP: 21, ANTH: 17, HBRW: 17, PSYC: 17,
        PHIL: 16, AMST: 14, FREN: 14, SOC: 14, COSI: 13, FYS: 13, COMP: 12, CHIN:
        7, HRNS: 7, JAPN: 7, ARBC: 6, HSSP: 6, LING: 6, NBIO: 6, BCHM: 5, COML: 5,
        ITAL: 5, JOUR: 5, CLAS: 4, GER: 4, LGLS: 4, AAAS: 3, COEX: 3, ENVS: 3, GRK:
        3, LAT: 3, RUS: 3, WMGS: 3, BISC: 2, GECS: 2, IGS: 2, NPSY: 2, PHSC: 2,
        RECS: 2, SAS: 2, YDSH: 2, CHSC: 1, CP: 1, ECS: 1, FILM: 1, GS: 1, HECS: 1,
        IMES: 1, PAX: 1, REL: 1, SJSP: 1} ],
    [ '2010 Spring' , {HS: 87, THA: 71, MUS: 47, ECON: 37, BUS: 34, UWS: 34,
        CHEM: 33, MATH: 31, BIOL: 29, FA: 29, POL: 29, PE: 28, FIN: 25, NEJS: 25,
        ENG: 24, HIST: 24, HISP: 23, PHIL: 23, ANTH: 21, PHYS: 21, SOC: 19, ED: 18,
        PSYC: 16, COSI: 13, AMST: 12, HBRW: 12, FREN: 10, CHIN: 7, AAAS: 6, COML:
        6, FYS: 6, HSSP: 6, NBIO: 6, NPSY: 6, ARBC: 5, BCHM: 5, COEX: 5, JAPN: 5,
        WMGS: 5, ENVS: 4, GRK: 4, ITAL: 4, JOUR: 4, LGLS: 4, LING: 4, RUS: 4, BISC:
        3, GER: 3, HRNS: 3, CLAS: 2, FILM: 2, IGS: 2, LAT: 2, BIOP: 1, CHSC: 1,
        CONT: 1, CP: 1, GECS: 1, GS: 1, HUM: 1, IMES: 1, PAX: 1, QBIO: 1, RECS: 1,
        REL: 1, YDSH: 1} ],
    [ '2010 Fall'   , {HS: 83, THA: 60, MUS: 46, MATH: 35, BUS: 32, CHEM: 31,
        ECON: 31, FA: 31, PE: 30, BIOL: 28, ENG: 26, UWS: 25, POL: 23, ED: 22, FIN:
        22, HISP: 22, NEJS: 22, PHIL: 19, PSYC: 19, HIST: 18, SOC: 18, HBRW: 17,
        PHYS: 17, ANTH: 15, FREN: 14, COSI: 13, COMP: 12, AMST: 11, FYS: 9, HRNS:
        9, CHIN: 8, HSSP: 7, NBIO: 7, AAAS: 6, ARBC: 6, LGLS: 6, LING: 6, CLAS: 5,
        ENVS: 5, GER: 5, JAPN: 5, NPSY: 5, BCHM: 4, ITAL: 4, JOUR: 4, LAT: 3, RUS:
        3, WMGS: 3, COML: 2, GRK: 2, IGS: 2, RECS: 2, SAS: 2, YDSH: 2, BIOP: 1,
        BIOT: 1, BISC: 1, CHSC: 1, 'ECON/FIN': 1, ECS: 1, 'ENG/HIST': 1, FILM: 1,
        GECS: 1, GS: 1, HUM: 1, IECS: 1, IMES: 1, PAX: 1, PHSC: 1, SJSP: 1} ],
    [ '2011 Spring' , {HS: 101, THA: 56, MUS: 46, BUS: 38, ECON: 38, BIOL: 32,
        CHEM: 31, FA: 31, PE: 30, MATH: 29, FIN: 28, UWS: 28, ENG: 27, HIST: 23,
        POL: 23, NEJS: 22, HISP: 20, PSYC: 20, ED: 19, PHIL: 19, SOC: 18, ANTH: 16,
        PHYS: 16, COSI: 15, HBRW: 13, AMST: 11, FREN: 11, HSSP: 8, CHIN: 7, BCHM:
        6, JAPN: 6, NBIO: 6, AAAS: 5, ARBC: 5, CLAS: 5, LING: 5, NPSY: 5, WMGS: 5,
        COML: 4, COMP: 4, GER: 4, HRNS: 4, ITAL: 4, LGLS: 4, ENVS: 3, GECS: 3,
        JOUR: 3, RUS: 3, BISC: 2, FILM: 2, GRK: 2, LAT: 2, PAX: 2, RECS: 2, REL: 2,
        YDSH: 2, BIOT: 1, CBIO: 1, CHSC: 1, CONT: 1, 'ECON/FA': 1, GS: 1,
        'HRNS/HS': 1, 'HRNS/NEJ': 1, IGS: 1, IMES: 1, 'LGLS/POL': 1, 'NEJS/SOC': 1,
        QBIO: 1, SJSP: 1} ],
    [ '2011 Fall'   , {HS: 93, MUS: 53, THA: 47, MATH: 38, BUS: 36, ECON: 36,
        CHEM: 33, FA: 31, ENG: 30, FIN: 28, PE: 28, BIOL: 27, NEJS: 27, UWS: 26,
        HISP: 23, ED: 22, POL: 22, HIST: 20, PSYC: 20, ANTH: 19, PHYS: 17, COSI:
        16, PHIL: 16, FREN: 15, SOC: 15, HBRW: 14, AMST: 12, COMP: 11, CHIN: 8,
        JAPN: 7, NBIO: 7, FYS: 6, GER: 6, HRNS: 6, HSSP: 6, ITAL: 6, LING: 6, AAAS:
        5, BCHM: 5, CLAS: 5, JOUR: 5, LGLS: 5, ARBC: 4, ENVS: 4, ESL: 4, NPSY: 4,
        BISC: 3, LAT: 3, RUS: 3, WMGS: 3, FILM: 2, GRK: 2, IGS: 2, SAS: 2, YDSH: 2,
        'AMST/SOC': 1, 'ANTH/NEJ': 1, BCBP: 1, BIOT: 1, CBIO: 1, CHSC: 1, COML: 1,
        'ECON/FIN': 1, ECS: 1, GS: 1, HECS: 1, IMES: 1, PAX: 1, PHSC: 1, RECS: 1,
        SJSP: 1, SYS: 1} ],
    [ '2012 Spring' , {HS: 100, MUS: 52, THA: 48, BUS: 42, ECON: 37, BIOL: 33,
        CHEM: 33, FA: 32, UWS: 32, MATH: 31, FIN: 30, ENG: 29, PE: 29, ANTH: 27,
        POL: 23, HISP: 22, HIST: 20, NEJS: 20, ED: 19, SOC: 19, COSI: 18, PHIL: 16,
        PSYC: 15, HBRW: 14, PHYS: 14, FREN: 11, AMST: 10, CHIN: 8, HSSP: 8, NPSY:
        7, AAAS: 6, NBIO: 6, BCHM: 5, HRNS: 5, LGLS: 5, LING: 5, ARBC: 4, GER: 4,
        ITAL: 4, JAPN: 4, RUS: 4, WMGS: 4, BISC: 3, CLAS: 3, COML: 3, COMP: 3,
        ENVS: 3, GRK: 3, IGS: 3, BCBP: 2, BIOT: 2, ESL: 2, FILM: 2, GECS: 2, GS: 2,
        JOUR: 2, LAT: 2, RECS: 2, YDSH: 2, CHSC: 1, CONT: 1, 'ECON/FIN': 1,
        'HRNS/HS': 1, HUM: 1, IMES: 1, 'LGLS/POL': 1, PAX: 1, QBIO: 1, 'REL/SAS':
        1, SYS: 1} ],
    [ '2012 Fall'   , {HS: 91, MUS: 50, BUS: 38, MATH: 36, ECON: 35, CHEM: 34,
        THA: 34, PE: 32, BIOL: 31, FA: 30, UWS: 30, HISP: 28, NEJS: 27, FIN: 26,
        POL: 25, ANTH: 24, ENG: 24, ED: 23, HIST: 23, PHIL: 22, PSYC: 19, SOC: 18,
        PHYS: 17, COSI: 16, FREN: 16, CHIN: 13, HBRW: 13, COMP: 11, ESL: 11, AMST:
        9, AAAS: 8, FYS: 7, HSSP: 7, JAPN: 7, NBIO: 7, ITAL: 6, LGLS: 6, ARBC: 5,
        BCHM: 5, CLAS: 5, ENVS: 5, GER: 5, HRNS: 5, LING: 5, JOUR: 4, NPSY: 4,
        COML: 3, LAT: 3, RUS: 3, SAS: 3, WMGS: 3, BISC: 2, ECS: 2, GRK: 2, GS: 2,
        IGS: 2, RECS: 2, YDSH: 2, 'ANTH/ENG': 1, BCBP: 1, BIOT: 1, CBIO: 1, CHSC:
        1, 'CLAS/FA': 1, 'ECON/FIN': 1, FILM: 1, IMES: 1, PAX: 1, PMED: 1, QBIO: 1,
        'RECS/THA': 1, SJSP: 1, SYS: 1} ],
    [ '2013 Spring' , {HS: 107, MUS: 49, BUS: 45, BIOL: 41, ECON: 38, CHEM: 36,
        FA: 33, PE: 33, THA: 32, MATH: 30, ENG: 27, FIN: 27, UWS: 27, NEJS: 25,
        HIST: 22, PHIL: 22, POL: 22, ED: 21, SOC: 20, HISP: 19, PHYS: 18, ANTH: 16,
        COSI: 16, PSYC: 16, FREN: 13, ESL: 11, AMST: 10, HBRW: 10, HSSP: 10, CHIN:
        9, AAAS: 6, JAPN: 6, NBIO: 6, NPSY: 6, ARBC: 5, BCHM: 5, HRNS: 5, LGLS: 5,
        LING: 5, WMGS: 5, GER: 4, ITAL: 4, JOUR: 4, RUS: 4, CLAS: 3, COML: 3, COMP:
        3, ENVS: 3, GRK: 3, IGS: 3, BCBP: 2, BISC: 2, 'ECON/FIN': 2, FILM: 2, FYS:
        2, LAT: 2, PAX: 2, YDSH: 2, BIOT: 1, CHSC: 1, 'CLAS/THA': 1, 'COML/ENG': 1,
        CONT: 1, 'ECON/FA': 1, 'ENG/HIST': 1, GECS: 1, GS: 1, 'HRNS/HS': 1, HUM: 1,
        'IGS/SAS': 1, 'LGLS/POL': 1, PMED: 1, QBIO: 1, RECS: 1, REL: 1, 'REL/SAS':
        1, SAS: 1, SJSP: 1, SYS: 1} ],
    [ '2013 Fall'   , {HS: 90, BUS: 42, MUS: 40, BIOL: 39, MATH: 39, ECON: 35,
        PE: 35, FA: 33, CHEM: 32, THA: 32, FIN: 31, HISP: 27, NEJS: 27, UWS: 26,
        ENG: 24, ED: 23, POL: 23, HIST: 20, ANTH: 19, COSI: 19, PHIL: 18, SOC: 18,
        COMP: 17, PSYC: 17, FREN: 16, CHIN: 15, PHYS: 15, HBRW: 12, AMST: 11, ESL:
        10, NBIO: 8, AAAS: 7, HSSP: 7, CLAS: 6, ITAL: 6, JAPN: 6, LGLS: 6, LING: 6,
        ARBC: 5, GER: 5, HRNS: 5, ENVS: 4, FYS: 4, JOUR: 4, WMGS: 4, BCHM: 3, LAT:
        3, NPSY: 3, RUS: 3, BCBP: 2, BISC: 2, COML: 2, FILM: 2, GRK: 2, GS: 2, IGS:
        2, PAX: 2, YDSH: 2, BIBC: 1, BIOT: 1, CHSC: 1, COMH: 1, 'COML/ENG': 1,
        GECS: 1, GSAS: 1, IMES: 1, KOR: 1, PHSC: 1, PMED: 1, RECS: 1, SAS: 1, SJSP:
        1, SYS: 1} ],
    [ '2014 Spring' , {HS: 114, MUS: 53, BUS: 44, BIOL: 41, ECON: 39, CHEM: 35,
        THA: 33, FIN: 32, PE: 32, FA: 31, MATH: 30, UWS: 30, ENG: 27, NEJS: 24,
        POL: 23, HISP: 22, HIST: 22, ED: 21, PSYC: 21, COSI: 19, SOC: 19, ANTH: 18,
        PHIL: 15, PHYS: 15, CHIN: 13, FREN: 13, HSSP: 12, AMST: 10, HBRW: 10, LGLS:
        7, NBIO: 7, COMP: 6, HRNS: 6, AAAS: 5, ARBC: 5, CLAS: 5, JAPN: 5, LING: 5,
        NPSY: 5, WMGS: 5, BCHM: 4, ESL: 4, GER: 4, ITAL: 4, RUS: 4, BCBP: 3, COML:
        3, ENVS: 3, GRK: 3, IGS: 3, JOUR: 3, SAS: 3, BIOT: 2, BISC: 2, 'ECON/FIN':
        2, FYS: 2, LAT: 2, RECS: 2, CBIO: 1, CHSC: 1, COMH: 1, 'COML/THA': 1, CONT:
        1, ECS: 1, FILM: 1, GECS: 1, GS: 1, GSAS: 1, 'HRNS/HS': 1, HUM: 1, INT: 1,
        KOR: 1, PAX: 1, PMED: 1, QBIO: 1, REL: 1, SYS: 1, YDSH: 1} ],
    [ '2014 Fall'   , {HS: 93, MUS: 59, BUS: 45, MATH: 40, PE: 35, ECON: 33, FA:
        32, CHEM: 31, BIOL: 28, THA: 28, FIN: 27, HISP: 26, NEJS: 26, UWS: 26, ENG:
        25, ED: 23, POL: 22, HIST: 20, ANTH: 19, PSYC: 19, PHYS: 17, BCBP: 16, SOC:
        16, CHIN: 15, COSI: 15, FREN: 15, PHIL: 15, COMP: 14, HBRW: 13, AMST: 11,
        JAPN: 9, HSSP: 8, NBIO: 7, AAAS: 6, CLAS: 6, GER: 6, ITAL: 6, LGLS: 6,
        WMGS: 6, ARBC: 5, HRNS: 5, LING: 5, BCHM: 4, ENVS: 4, ESL: 4, NPSY: 4, RUS:
        4, LAT: 3, FILM: 2, GRK: 2, JOUR: 2, RECS: 2, REL: 2, SAS: 2, YDSH: 2,
        BIBC: 1, BIOT: 1, BISC: 1, CBIO: 1, CHSC: 1, COMH: 1, ECS: 1, FYS: 1, GS:
        1, HINDI: 1, HOID: 1, IGS: 1, IMES: 1, INT: 1, KOR: 1, NPHY: 1, PAX: 1,
        PMED: 1, 'REL/SAS': 1, SJSP: 1} ],
    [ '2015 Spring' , {HS: 120, MUS: 58, BIOL: 46, BUS: 43, BCBP: 40, ECON: 39,
        CHEM: 36, MATH: 32, THA: 31, PE: 30, FA: 29, FIN: 29, UWS: 29, NEJS: 25,
        POL: 25, ENG: 24, ANTH: 23, HISP: 22, HIST: 21, COSI: 20, ED: 20, PSYC: 19,
        PHYS: 18, PHIL: 17, SOC: 16, CHIN: 15, HSSP: 14, AMST: 13, FREN: 12, HBRW:
        9, AAAS: 7, BCHM: 6, COMP: 6, HRNS: 6, JAPN: 6, LGLS: 6, NBIO: 6, NPSY: 6,
        ARBC: 5, CLAS: 5, LING: 5, ESL: 4, GER: 4, ITAL: 4, JOUR: 4, COML: 3, ENVS:
        3, GRK: 3, IGS: 3, RUS: 3, BIOT: 2, CHSC: 2, 'COML/ENG': 2, 'ECON/FIN': 2,
        FILM: 2, FYS: 2, GECS: 2, LAT: 2, PAX: 2, RECS: 2, REL: 2, WMGS: 2, YDSH:
        2, 'AAAS/WGS': 1, BISC: 1, CAST: 1, CONT: 1, 'FA/NEJS': 1, GS: 1, HECS: 1,
        HINDI: 1, 'HRNS/HS': 1, INT: 1, KOR: 1, PMED: 1, QBIO: 1, SQS: 1} ],
    [ '2015 Fall'   , {HS: 97, MUS: 58, BUS: 43, BIOL: 42, MATH: 37, ECON: 36,
        PE: 34, CHEM: 33, FA: 29, UWS: 29, THA: 28, ENG: 27, FIN: 27, POL: 26,
        HISP: 25, ED: 24, NEJS: 24, ANTH: 23, HIST: 19, COSI: 18, PHIL: 18, PHYS:
        18, PSYC: 18, SOC: 16, CHIN: 14, COMP: 13, FREN: 13, AMST: 11, HBRW: 11,
        JAPN: 8, AAAS: 7, EL: 7, HSSP: 7, NBIO: 7, LGLS: 6, ARBC: 5, ENVS: 5, GER:
        5, ITAL: 5, JOUR: 5, LING: 5, WMGS: 5, BCHM: 4, CLAS: 4, ESL: 4, HRNS: 4,
        NPSY: 4, BCBP: 3, LAT: 3, RECS: 3, RUS: 3, BISC: 2, CHSC: 2, FYS: 2, GRK:
        2, IGS: 2, IMES: 2, 'AMST/MUS': 1, BIBC: 1, BIOT: 1, COMH: 1, 'FA/NEJS': 1,
        FILM: 1, GECS: 1, GS: 1, HINDI: 1, 'HIST/SOC': 1, HOID: 1, INT: 1, KOR: 1,
        LALS: 1, PAX: 1, PHSC: 1, PMED: 1, REL: 1, SAS: 1, SJSP: 1, SQS: 1} ],
    [ '2016 Spring' , {HS: 116, MUS: 58, BIOL: 40, BUS: 39, ECON: 38, CHEM: 37,
        THA: 34, PE: 32, MATH: 31, FA: 29, POL: 29, NEJS: 28, FIN: 25, ANTH: 24,
        ENG: 24, COSI: 22, HIST: 22, UWS: 22, ED: 21, HISP: 21, PHIL: 19, PSYC: 17,
        PHYS: 16, SOC: 16, HSSP: 15, CHIN: 13, AMST: 11, FREN: 11, EL: 9, HBRW: 8,
        AAAS: 7, HRNS: 6, LGLS: 6, NBIO: 6, COMP: 5, JAPN: 5, ARBC: 4, BCHM: 4,
        ESL: 4, GER: 4, ITAL: 4, JOUR: 4, LING: 4, NPSY: 4, RUS: 4, BCBP: 3, CLAS:
        3, ENVS: 3, GRK: 3, WMGS: 3, BIOT: 2, COML: 2, 'ECON/FIN': 2, FILM: 2, LAT:
        2, PAX: 2, SQS: 2, 'AAAS/WGS': 1, 'AMST/MUS': 1, BISC: 1, CAST: 1, CBIO: 1,
        CHSC: 1, COMH: 1, 'COML/ENG': 1, 'COML/HOI': 1, CONT: 1, EBIO: 1,
        'ECON/FA': 1, GS: 1, HINDI: 1, 'HRNS/HS': 1, HUM: 1, IGS: 1, INT: 1, KOR:
        1, PMED: 1, PORT: 1, QBIO: 1, RECS: 1, REL: 1, SAS: 1} ],
    [ '2016 Fall'   , {HS: 102, MUS: 61, BIOL: 41, BUS: 40, MATH: 38, PE: 36,
        ECON: 35, FA: 30, FIN: 28, PHYS: 28, CHEM: 27, THA: 27, UWS: 26, HISP: 24,
        ED: 23, ENG: 23, NEJS: 22, ANTH: 21, HIST: 21, POL: 20, SOC: 20, COMP: 17,
        PSYC: 17, COSI: 16, CHIN: 12, PHIL: 12, FREN: 11, HBRW: 10, HSSP: 10, AMST:
        9, JAPN: 9, AAAS: 8, EL: 8, LGLS: 8, CLAS: 7, LING: 7, GER: 5, ITAL: 5,
        NBIO: 5, WMGS: 5, ARBC: 4, BCHM: 4, ESL: 4, HRNS: 4, NPSY: 4, JOUR: 3, KOR:
        3, LAT: 3, RUS: 3, BCBP: 2, ENVS: 2, GRK: 2, IGS: 2, BIBC: 1, BIOT: 1,
        BISC: 1, CAST: 1, CBIO: 1, CHSC: 1, COMH: 1, COML: 1, 'COML/ENG': 1, ECS:
        1, FILM: 1, FYS: 1, GS: 1, 'HUM/UWS': 1, IMES: 1, INT: 1, PAX: 1, PMED: 1,
        PORT: 1, RECS: 1, 'RECS/THA': 1, REL: 1, SAS: 1, SJSP: 1, YDSH: 1} ],
    [ '2017 Spring' , {HS: 103, MUS: 62, BIOL: 46, BUS: 41, ECON: 35, MATH: 34,
        CHEM: 33, PE: 31, FA: 30, THA: 29, ENG: 26, FIN: 26, UWS: 26, ANTH: 23,
        HIST: 23, NEJS: 23, ED: 22, HISP: 22, PHYS: 22, COSI: 19, PHIL: 19, POL:
        18, PSYC: 18, SOC: 18, CHIN: 15, FREN: 12, HSSP: 10, AMST: 9, EL: 9, JAPN:
        8, AAAS: 7, HBRW: 7, NBIO: 7, HRNS: 6, LING: 6, NPSY: 6, ARBC: 5, JOUR: 5,
        LGLS: 5, BCHM: 4, CLAS: 4, COMP: 4, ESL: 4, GER: 4, ITAL: 4, KOR: 4, RUS:
        4, BCBP: 3, COML: 3, 'ECON/FIN': 3, FILM: 3, BIOT: 2, ENVS: 2, GRK: 2, IGS:
        2, LAT: 2, RECS: 2, SQS: 2, 'AAAS/ENG': 1, 'AAAS/FA': 1, BISC: 1, CAST: 1,
        CBIO: 1, COMH: 1, CONT: 1, 'ECON/HIS': 1, 'ENVS/THA': 1, FYS: 1, GS: 1,
        'HRNS/HS': 1, HUM: 1, 'IGS/LGLS': 1, INT: 1, LALS: 1, PAX: 1, PMED: 1,
        QBIO: 1, REL: 1, WMGS: 1, YDSH: 1} ],
    [ '2017 Fall'   , {HS: 94, MUS: 52, BUS: 48, BIOL: 41, MATH: 41, FIN: 34, PE:
        33, ECON: 32, FA: 31, UWS: 28, CHEM: 27, PHYS: 27, ANTH: 26, THA: 26, ENG:
        25, HISP: 24, ED: 22, HIST: 21, NEJS: 21, POL: 20, COSI: 17, PSYC: 17,
        PHIL: 16, SOC: 15, CHIN: 13, COMP: 13, FREN: 13, HBRW: 10, JAPN: 9, HSSP:
        8, LGLS: 8, LING: 8, EL: 7, AMST: 6, BCHM: 6, ITAL: 6, AAAS: 5, CLAS: 5,
        GER: 5, NBIO: 5, NPSY: 5, WMGS: 5, ARBC: 4, ESL: 4, HRNS: 4, JOUR: 4, RUS:
        4, ENVS: 3, GRK: 3, KOR: 3, LAT: 3, BCBP: 2, COML: 2, FYS: 2, GS: 2, IGS:
        2, YDSH: 2, 'AAAS/WGS': 1, AAPI: 1, 'AMST/MUS': 1, BISC: 1, 'BUS/ECON': 1,
        CAST: 1, CBIO: 1, CHSC: 1, COMH: 1, 'COML/ENG': 1, 'ECON/FIN': 1, ECS: 1,
        FILM: 1, 'HIST/SOC': 1, 'HUM/UWS': 1, IMES: 1, INT: 1, NPHY: 1, PAX: 1,
        PMED: 1, PORT: 1, RECS: 1, REL: 1, 'REL/SAS': 1, SAS: 1} ],
    [ '2018 Spring' , {HS: 98, MUS: 61, BIOL: 44, BUS: 42, ECON: 35, MATH: 33,
        THA: 33, PE: 31, CHEM: 30, FA: 29, ENG: 28, FIN: 27, NEJS: 26, UWS: 25,
        COSI: 22, ED: 22, PHYS: 22, ANTH: 20, HISP: 20, PHIL: 19, HIST: 17, PSYC:
        16, SOC: 16, CHIN: 15, POL: 13, FREN: 12, HSSP: 12, HBRW: 8, JAPN: 8, NBIO:
        8, AMST: 7, CLAS: 7, LGLS: 6, AAAS: 5, COMP: 5, EL: 5, HRNS: 5, RUS: 5,
        ARBC: 4, BCHM: 4, 'ECON/FIN': 4, ESL: 4, GER: 4, ITAL: 4, LING: 4, NPSY: 4,
        WMGS: 4, BCBP: 3, FILM: 3, GECS: 3, IGS: 3, JOUR: 3, KOR: 3, BIOT: 2, ENVS:
        2, GRK: 2, LAT: 2, YDSH: 2, 'AAAS/FA': 1, AAPI: 1, 'AMST/MUS': 1, BIBC: 1,
        'BUS/FIN': 1, CA: 1, CAST: 1, CBIO: 1, COMH: 1, COML: 1, 'COML/HUM': 1,
        EBIO: 1, 'ECON/FA': 1, 'ECON/HIS': 1, ECS: 1, 'FA/NEJS': 1, 'FA/RECS': 1,
        GS: 1, 'HRNS/HS': 1, 'IGS/LGLS': 1, INT: 1, LALS: 1, PAX: 1, PHSC: 1, PMED:
        1, QBIO: 1, RECS: 1, REL: 1, SQS: 1} ],
    [ '2018 Fall'   , {HS: 97, MUS: 59, BIOL: 47, BUS: 46, MATH: 40, FA: 34, FIN:
        33, ECON: 32, UWS: 30, PHYS: 27, CHEM: 26, ENG: 26, HISP: 25, THA: 25, PE:
        24, ANTH: 22, ED: 21, POL: 21, HIST: 19, NEJS: 18, PHIL: 18, COSI: 17, SOC:
        14, CHIN: 13, FREN: 13, PSYC: 13, HBRW: 10, JAPN: 10, COMP: 9, HSSP: 9,
        AAAS: 7, LGLS: 7, LING: 6, NBIO: 6, BCHM: 5, ITAL: 5, NPSY: 5, WMGS: 5,
        AMST: 4, ARBC: 4, CLAS: 4, ESL: 4, GER: 4, RUS: 4, BCBP: 3, EL: 3, ENVS: 3,
        GRK: 3, HRNS: 3, JOUR: 3, KOR: 3, LAT: 3, SAS: 3, 'AMST/MUS': 2, GS: 2,
        IGS: 2, IMES: 2, YDSH: 2, AAPI: 1, 'AMST/ANT': 1, 'AMST/ENG': 1, BISC: 1,
        'BUS/ECON': 1, 'BUS/FIN': 1, CAST: 1, CBIO: 1, CHSC: 1, COML: 1,
        'COML/ENG': 1, 'ECON/FIN': 1, 'ECON/HIS': 1, ECS: 1, 'ECS/ENG': 1, FILM: 1,
        FYS: 1, GECS: 1, 'HIST/SOC': 1, HUM: 1, 'HUM/UWS': 1, 'IGS/SAS': 1, INT: 1,
        NPHY: 1, PMED: 1, RECS: 1, 'RECS/THA': 1, REL: 1, SJSP: 1} ],
]

SUBJECTS = ['AAAS', 'AAAS/ENG', 'AAAS/FA', 'AAAS/WGS', 'AAPI', 'AMST',
    'AMST/ANT', 'AMST/ENG', 'AMST/MUS', 'AMST/SOC', 'ANTH', 'ANTH/ENG',
    'ANTH/NEJ', 'ARBC', 'BCBP', 'BCHM', 'BCSC', 'BIBC', 'BIOL', 'BIOP', 'BIOT',
    'BIPH', 'BISC', 'BUS', 'BUS/ECON', 'BUS/FIN', 'CA', 'CAST', 'CBIO', 'CHEM',
    'CHIN', 'CHSC', 'CLAS', 'CLAS/FA', 'CLAS/THA', 'COEX', 'COMH', 'COML',
    'COML/ENG', 'COML/HOI', 'COML/HUM', 'COML/THA', 'COMP', 'CONT', 'COSI',
    'CP', 'EAS', 'EBIO', 'ECON', 'ECON/FA', 'ECON/FIN', 'ECON/HIS', 'ECS',
    'ECS/ENG', 'ED', 'EL', 'ENG', 'ENG/HIST', 'ENVS', 'ENVS/THA', 'ESL', 'FA',
    'FA/NEJS', 'FA/RECS', 'FECS', 'FILM', 'FIN', 'FREN', 'FYS', 'GECS', 'GER',
    'GRK', 'GS', 'GSAS', 'HBRW', 'HECS', 'HINDI', 'HISP', 'HIST', 'HIST/SOC',
    'HOID', 'HRNS', 'HRNS/HS', 'HRNS/NEJ', 'HS', 'HSSP', 'HUM', 'HUM/UWS',
    'IECS', 'IGS', 'IGS/LGLS', 'IGS/SAS', 'IMES', 'INT', 'ITAL', 'JAPN', 'JCS',
    'JOUR', 'KOR', 'LALS', 'LAS', 'LAT', 'LGLS', 'LGLS/POL', 'LING', 'MATH',
    'MUS', 'NBIO', 'NEJS', 'NEJS/SOC', 'NPHY', 'NPSY', 'PAX', 'PE', 'PHIL',
    'PHSC', 'PHYS', 'PMED', 'POL', 'PORT', 'PSYC', 'QBIO', 'RECS', 'RECS/THA',
    'REL', 'REL/SAS', 'RUS', 'SAL', 'SAS', 'SECS', 'SJSP', 'SOC', 'SPAN',
    'SQS', 'SYS', 'THA', 'USEM', 'UWS', 'WMGS', 'WMNS', 'YDSH', ]

AVG_STUDENTS_PER_SUBJECT = [
    [ '2004 Fall'   , {'AAAS': 15.0, 'AMST': 37.6364, 'ANTH': 32.8889, 'ARBC':
        18.3333, 'BCHM': 16.8, 'BIOL': 30.8621, 'BIPH': 8.0, 'BISC': 54.0,
        'BUS': 31.4211, 'CHEM': 28.6333, 'CHIN': 18.6667, 'CHSC': 61.0, 'CLAS':
        17.5, 'COEX': 14.0, 'COML': 8.0, 'COMP': 9.125, 'COSI': 27.3, 'ECON':
        40.4194, 'ECS': 22.0, 'ED': 11.5556, 'ENG': 25.0741, 'ENVS': 1.5, 'FA':
        18.5, 'FILM': 49.0, 'FIN': 40.8571, 'FREN': 16.3077, 'GECS': 18.0,
        'GER': 12.8333, 'GRK': 9.0, 'HBRW': 16.1579, 'HIST': 24.9231, 'HS':
        19.3559, 'HSSP': 8.3333, 'IECS': 19.0, 'IGS': 64.0, 'ITAL': 17.0,
        'JAPN': 12.3333, 'JCS': 11.7143, 'JOUR': 64.6667, 'LAT': 12.5, 'LGLS':
        22.25, 'LING': 31.0, 'MATH': 17.0513, 'MUS': 11.4146, 'NBIO': 33.8333,
        'NEJS': 19.8095, 'NPSY': 14.6667, 'PE': 16.3784, 'PHIL': 42.8333,
        'PHSC': 34.0, 'PHYS': 22.7, 'POL': 28.8182, 'PSYC': 34.1053, 'RECS':
        8.0, 'RUS': 9.6667, 'SOC': 30.375, 'SPAN': 18.1923, 'THA': 9.5385,
        'USEM': 16.6207, 'UWS': 15.2143, 'WMNS': 22.0, 'YDSH': 15.0} ],
    [ '2005 Spring' , {'AAAS': 13.8, 'AMST': 30.4375, 'ANTH': 23.375, 'ARBC':
        15.3333, 'BCHM': 18.4, 'BIOL': 27.5, 'BIOP': 1.0, 'BIPH': 5.0, 'BISC':
        43.5, 'BUS': 33.3478, 'CHEM': 28.3333, 'CHIN': 14.3333, 'CLAS':
        30.3333, 'COEX': 9.75, 'COML': 26.0, 'COMP': 8.0, 'CONT': 27.0, 'COSI':
        28.1, 'EAS': 14.3333, 'ECON': 32.4286, 'ED': 8.7273, 'ENG': 18.3571,
        'ENVS': 5.3333, 'FA': 22.5172, 'FECS': 21.0, 'FIN': 35.9444, 'FREN':
        16.8, 'GECS': 13.0, 'GER': 9.5, 'GRK': 10.0, 'HBRW': 15.625, 'HIST':
        29.1304, 'HS': 17.1864, 'HSSP': 6.7143, 'HUM': 43.0, 'IGS': 51.5,
        'IMES': 35.0, 'ITAL': 14.6, 'JAPN': 10.5, 'JCS': 11.5714, 'JOUR': 28.5,
        'LAT': 13.5, 'LGLS': 42.2, 'LING': 16.5, 'MATH': 15.8125, 'MUS':
        9.0256, 'NBIO': 24.25, 'NEJS': 15.6471, 'NPHY': 9.0, 'NPSY': 33.0,
        'PAX': 14.0, 'PE': 15.6875, 'PHIL': 39.4706, 'PHSC': 27.0, 'PHYS':
        22.913, 'POL': 25.0, 'PSYC': 31.2632, 'RECS': 12.5, 'REL': 6.0, 'RUS':
        7.0, 'SOC': 21.0, 'SPAN': 17.0435, 'THA': 8.8519, 'USEM': 17.4545,
        'UWS': 15.3333, 'WMNS': 14.0, 'YDSH': 10.5} ],
    [ '2005 Fall'   , {'AAAS': 21.3333, 'AMST': 40.4167, 'ANTH': 35.9167,
        'ARBC': 16.25, 'BCHM': 21.0, 'BCSC': 17.0, 'BIOL': 33.1071, 'BIPH':
        8.0, 'BISC': 20.0, 'BUS': 30.2, 'CHEM': 28.9667, 'CHIN': 14.8, 'CHSC':
        78.0, 'CLAS': 23.5, 'COEX': 17.0, 'COML': 16.0, 'COMP': 9.75, 'COSI':
        21.3, 'ECON': 40.1176, 'ECS': 26.0, 'ED': 8.8235, 'ENG': 21.2083,
        'ENVS': 11.75, 'FA': 19.2727, 'FECS': 10.0, 'FILM': 57.0, 'FIN':
        33.5882, 'FREN': 16.4667, 'GECS': 7.0, 'GER': 13.4, 'GRK': 7.0, 'HBRW':
        14.6111, 'HIST': 31.7727, 'HS': 25.4, 'HSSP': 39.5, 'IGS': 92.0,
        'ITAL': 16.8333, 'JAPN': 12.3333, 'JCS': 9.0, 'JOUR': 24.0, 'LAT':
        12.0, 'LGLS': 26.75, 'LING': 26.0, 'MATH': 16.475, 'MUS': 13.25,
        'NBIO': 27.0, 'NEJS': 22.3333, 'NPSY': 26.5, 'PE': 16.7568, 'PHIL':
        24.1429, 'PHSC': 82.0, 'PHYS': 20.8, 'POL': 27.3913, 'PSYC': 37.1579,
        'RECS': 7.5, 'RUS': 13.3333, 'SAL': 13.0, 'SOC': 30.125, 'SPAN':
        16.4286, 'THA': 9.1034, 'USEM': 17.1852, 'UWS': 15.5, 'WMGS': 24.0,
        'YDSH': 14.0} ],
    [ '2006 Spring' , {'AAAS': 12.4444, 'AMST': 28.1333, 'ANTH': 33.3125,
        'ARBC': 8.75, 'BCHM': 25.75, 'BIOL': 27.9032, 'BIOP': 2.0, 'BIPH': 8.0,
        'BISC': 35.0, 'BUS': 32.5, 'CHEM': 28.0385, 'CHIN': 17.4, 'CHSC': 20.5,
        'CLAS': 34.0, 'COEX': 13.0, 'COML': 11.5, 'COMP': 5.0, 'COSI': 25.8182,
        'EAS': 14.0, 'ECON': 33.5946, 'ECS': 16.0, 'ED': 7.25, 'ENG': 22.087,
        'ENVS': 16.0, 'FA': 21.4667, 'FIN': 34.75, 'FREN': 16.6667, 'GECS':
        11.0, 'GER': 10.5, 'GRK': 6.5, 'HBRW': 14.1333, 'HIST': 33.0, 'HS':
        16.9846, 'HSSP': 23.5, 'HUM': 53.0, 'IECS': 14.0, 'IGS': 57.5, 'IMES':
        19.0, 'ITAL': 13.4, 'JAPN': 16.0, 'JCS': 8.0, 'JOUR': 18.3333, 'LAS':
        23.0, 'LAT': 12.0, 'LGLS': 38.5714, 'LING': 16.75, 'MATH': 16.1515,
        'MUS': 10.6216, 'NBIO': 22.0, 'NEJS': 15.0, 'NPSY': 42.75, 'PE':
        14.7778, 'PHIL': 27.9231, 'PHSC': 20.5, 'PHYS': 21.7619, 'POL':
        25.0455, 'PSYC': 30.9412, 'RECS': 9.5, 'REL': 20.0, 'RUS': 8.6667,
        'SAL': 7.0, 'SECS': 7.0, 'SOC': 26.5, 'SPAN': 17.5833, 'THA': 8.0781,
        'USEM': 17.1818, 'UWS': 16.3333, 'WMGS': 18.6, 'YDSH': 7.0} ],
    [ '2006 Fall'   , {'AAAS': 23.0, 'AMST': 36.8571, 'ANTH': 35.0833, 'ARBC':
        15.75, 'BCHM': 27.5, 'BIOL': 32.5185, 'BIPH': 12.0, 'BISC': 42.0,
        'BUS': 36.2632, 'CHEM': 31.75, 'CHIN': 13.4286, 'CHSC': 53.0, 'CLAS':
        31.0, 'COEX': 16.6667, 'COML': 10.6667, 'COMP': 10.125, 'COSI':
        25.9091, 'ECON': 39.5588, 'ECS': 21.0, 'ED': 9.0667, 'ENG': 24.52,
        'ENVS': 9.6, 'FA': 20.2759, 'FIN': 36.2222, 'FREN': 14.1875, 'GECS':
        10.0, 'GER': 12.8333, 'GRK': 6.0, 'HBRW': 13.2632, 'HIST': 37.0,
        'HRNS': 10.4, 'HS': 22.3438, 'HSSP': 31.0, 'IGS': 81.0, 'IMES': 56.0,
        'ITAL': 15.0, 'JAPN': 12.1667, 'JOUR': 15.4, 'LAT': 12.5, 'LGLS':
        20.75, 'LING': 26.25, 'MATH': 17.3514, 'MUS': 13.375, 'NBIO': 39.8333,
        'NEJS': 15.5714, 'NPSY': 24.5, 'PE': 14.6757, 'PHIL': 30.75, 'PHSC':
        69.0, 'PHYS': 24.0909, 'POL': 30.4, 'PSYC': 35.05, 'RECS': 17.5, 'REL':
        17.0, 'RUS': 12.6667, 'SAL': 19.0, 'SOC': 33.7333, 'SPAN': 15.6452,
        'THA': 8.8947, 'USEM': 17.3077, 'UWS': 16.4167, 'WMGS': 23.0, 'YDSH':
        10.0} ],
    [ '2007 Spring' , {'AAAS': 20.0, 'AMST': 31.4, 'ANTH': 29.625, 'ARBC':
        12.5, 'BCHM': 18.8333, 'BCSC': 16.0, 'BIOL': 27.1714, 'BIOP': 7.0,
        'BIPH': 9.0, 'BISC': 36.0, 'BUS': 35.0, 'CHEM': 29.28, 'CHIN': 13.0,
        'CHSC': 14.0, 'CLAS': 37.6667, 'COEX': 12.0, 'COML': 28.0, 'CONT':
        36.0, 'COSI': 21.0, 'CP': 11.0, 'ECON': 31.878, 'ECS': 15.0, 'ED':
        7.1429, 'ENG': 25.2105, 'ENVS': 15.5, 'FA': 20.1667, 'FILM': 72.0,
        'FIN': 37.0952, 'FREN': 14.6154, 'GECS': 21.0, 'GER': 14.0, 'GRK': 6.0,
        'HBRW': 14.1333, 'HIST': 28.7, 'HRNS': 10.3333, 'HS': 19.2031, 'HSSP':
        20.4, 'HUM': 40.0, 'IECS': 9.0, 'IGS': 66.0, 'ITAL': 12.0, 'JAPN':
        15.8, 'JOUR': 15.25, 'LAT': 14.0, 'LGLS': 47.0, 'LING': 10.0, 'MATH':
        14.6286, 'MUS': 10.4737, 'NBIO': 27.1667, 'NEJS': 14.4167, 'NPSY':
        60.6667, 'PAX': 28.0, 'PE': 15.1389, 'PHIL': 27.8, 'PHSC': 18.0,
        'PHYS': 19.0, 'POL': 27.0909, 'PSYC': 30.5882, 'QBIO': 8.5, 'REL':
        24.0, 'RUS': 11.6667, 'SAL': 36.0, 'SOC': 39.5, 'SPAN': 15.8333, 'THA':
        8.6875, 'USEM': 17.2609, 'UWS': 15.6842, 'WMGS': 23.6, 'YDSH': 6.0} ],
    [ '2007 Fall'   , {'AAAS': 22.1429, 'AMST': 23.5833, 'ANTH': 31.9231,
        'ARBC': 15.5, 'BCHM': 24.0, 'BCSC': 39.0, 'BIOL': 33.1852, 'BIPH': 5.0,
        'BISC': 34.0, 'BUS': 33.6957, 'CHEM': 31.2593, 'CHIN': 14.5714, 'CLAS':
        24.3333, 'COEX': 12.25, 'COML': 12.0, 'COMP': 10.6667, 'COSI': 21.0833,
        'CP': 14.0, 'ECON': 40.8571, 'ECS': 22.0, 'ED': 8.7619, 'ENG': 17.8261,
        'ENVS': 11.75, 'FA': 19.6071, 'FILM': 79.0, 'FIN': 37.2174, 'FREN':
        12.5882, 'GECS': 5.0, 'GER': 13.8, 'GRK': 7.5, 'HBRW': 15.25, 'HIST':
        34.1667, 'HRNS': 11.5, 'HS': 27.8889, 'HSSP': 30.2, 'HUM': 48.0, 'IGS':
        47.5, 'IMES': 50.0, 'ITAL': 14.1667, 'JAPN': 14.8571, 'JOUR': 16.5,
        'LALS': 19.0, 'LAT': 11.6667, 'LGLS': 20.8, 'LING': 20.4, 'MATH':
        15.7568, 'MUS': 10.34, 'NBIO': 32.5, 'NEJS': 18.1429, 'NPSY': 19.75,
        'PE': 14.4595, 'PHIL': 33.3333, 'PHSC': 68.0, 'PHYS': 22.4545, 'POL':
        26.28, 'PSYC': 33.4211, 'RECS': 17.0, 'RUS': 7.6667, 'SJSP': 2.0,
        'SOC': 35.1875, 'SPAN': 15.6875, 'THA': 8.6557, 'USEM': 13.9355, 'UWS':
        15.48, 'WMGS': 21.25, 'YDSH': 10.0} ],
    [ '2008 Spring' , {'AAAS': 39.6667, 'AMST': 43.0, 'ANTH': 26.1875, 'ARBC':
        11.5, 'BCHM': 16.0, 'BCSC': 26.0, 'BIOL': 29.8387, 'BIOP': 5.0, 'BIPH':
        3.0, 'BISC': 18.0, 'BUS': 35.2333, 'CHEM': 23.8621, 'CHIN': 16.1667,
        'CHSC': 25.5, 'CLAS': 26.2, 'COEX': 12.75, 'COML': 16.0, 'CONT': 30.0,
        'COSI': 21.6, 'ECON': 29.425, 'ED': 8.2778, 'ENG': 18.1429, 'ENVS':
        12.0, 'FA': 20.64, 'FILM': 13.0, 'FIN': 37.625, 'FREN': 15.75, 'GER':
        12.25, 'GRK': 8.3333, 'HBRW': 13.6429, 'HIST': 27.3333, 'HRNS': 11.0,
        'HS': 21.3134, 'HSSP': 43.3333, 'HUM': 33.0, 'IGS': 43.5, 'ITAL':
        12.25, 'JAPN': 13.8571, 'JOUR': 21.4, 'LAT': 11.0, 'LGLS': 42.0,
        'LING': 10.5, 'MATH': 17.0, 'MUS': 9.8511, 'NBIO': 20.1667, 'NEJS':
        12.7778, 'NPSY': 59.3333, 'PAX': 36.0, 'PE': 15.7647, 'PHIL': 28.4615,
        'PHYS': 22.1667, 'POL': 24.12, 'PSYC': 33.6111, 'QBIO': 9.0, 'RECS':
        8.0, 'REL': 23.5, 'RUS': 4.6667, 'SAS': 15.0, 'SECS': 5.0, 'SOC': 27.1,
        'SPAN': 14.3103, 'THA': 8.0161, 'USEM': 14.88, 'UWS': 16.1111, 'WMGS':
        17.0, 'YDSH': 4.5} ],
    [ '2008 Fall'   , {'AAAS': 21.8333, 'AMST': 33.5455, 'ANTH': 24.7857,
        'ARBC': 13.4, 'BCHM': 27.0, 'BIOL': 35.1538, 'BISC': 22.0, 'BUS':
        33.9583, 'CHEM': 31.1379, 'CHIN': 16.0, 'CHSC': 24.0, 'CLAS': 22.6,
        'COEX': 29.5, 'COML': 14.5, 'COMP': 11.375, 'COSI': 22.3636, 'CP':
        15.0, 'ECON': 42.1944, 'ECS': 11.0, 'ED': 7.65, 'ENG': 17.0345, 'ENVS':
        17.75, 'FA': 19.1333, 'FILM': 51.0, 'FIN': 38.3, 'FREN': 12.1176,
        'GECS': 17.0, 'GER': 13.8, 'GRK': 2.6667, 'HBRW': 12.2941, 'HISP':
        14.8065, 'HIST': 26.25, 'HRNS': 9.5, 'HS': 27.0597, 'HSSP': 29.8333,
        'HUM': 5.0, 'IGS': 48.5, 'IMES': 52.0, 'ITAL': 16.1667, 'JAPN':
        12.8571, 'JOUR': 17.1667, 'LAT': 12.0, 'LGLS': 22.2, 'LING': 16.2,
        'MATH': 18.4444, 'MUS': 11.5319, 'NBIO': 36.1429, 'NEJS': 13.6364,
        'NPSY': 43.0, 'PAX': 9.0, 'PE': 14.6857, 'PHIL': 32.0, 'PHSC': 29.5,
        'PHYS': 20.3913, 'POL': 31.1053, 'PSYC': 35.2941, 'RECS': 9.0, 'REL':
        44.0, 'RUS': 10.6667, 'SAS': 20.0, 'SJSP': 8.0, 'SOC': 26.5333, 'THA':
        8.9107, 'USEM': 14.4194, 'UWS': 15.4, 'WMGS': 20.0, 'YDSH': 5.0} ],
    [ '2009 Spring' , {'AAAS': 27.75, 'AMST': 50.0, 'ANTH': 23.5263, 'ARBC':
        13.0, 'BCHM': 18.75, 'BIOL': 32.0645, 'BIOP': 4.0, 'BISC': 28.0, 'BUS':
        32.5484, 'CHEM': 28.2963, 'CHIN': 15.1429, 'CHSC': 9.0, 'CLAS': 39.0,
        'COEX': 24.2, 'COML': 34.0, 'CONT': 31.0, 'COSI': 26.1818, 'ECON':
        36.1471, 'ECS': 11.0, 'ED': 7.7778, 'ENG': 16.6923, 'ENVS': 9.6, 'FA':
        20.3103, 'FILM': 14.0, 'FIN': 36.9565, 'FREN': 15.5455, 'GECS': 9.0,
        'GER': 11.75, 'GRK': 6.6667, 'HBRW': 13.5714, 'HECS': 11.0, 'HISP':
        15.3846, 'HIST': 25.6316, 'HRNS': 8.6667, 'HS': 21.6232, 'HSSP': 29.0,
        'IECS': 29.0, 'IGS': 60.5, 'ITAL': 16.5, 'JAPN': 12.75, 'JOUR': 21.25,
        'LAT': 9.0, 'LGLS': 39.2, 'LING': 12.2, 'MATH': 17.7667, 'MUS':
        10.7234, 'NBIO': 24.0, 'NEJS': 14.6296, 'NPSY': 33.75, 'PAX': 37.0,
        'PE': 14.6471, 'PHIL': 23.0769, 'PHYS': 18.8182, 'POL': 26.6, 'PSYC':
        41.1875, 'QBIO': 10.5, 'RECS': 11.0, 'REL': 17.0, 'RUS': 8.5, 'SOC':
        30.4762, 'THA': 8.1607, 'USEM': 16.0714, 'UWS': 16.1333, 'WMGS': 13.5}
    ],
    [ '2009 Fall'   , {'AAAS': 30.0, 'AMST': 28.3571, 'ANTH': 26.9375, 'ARBC':
        17.0, 'BCHM': 27.8, 'BIOL': 36.8519, 'BISC': 48.5, 'BUS': 35.5417,
        'CHEM': 34.3333, 'CHIN': 21.0, 'CHSC': 17.0, 'CLAS': 29.0, 'COEX':
        16.0, 'COML': 12.2, 'COMP': 10.3333, 'COSI': 28.3846, 'CP': 11.0,
        'ECON': 41.6111, 'ECS': 15.0, 'ED': 7.2727, 'ENG': 22.32, 'ENVS':
        18.3333, 'FA': 19.7037, 'FILM': 17.0, 'FIN': 35.7391, 'FREN': 17.1429,
        'FYS': 11.6154, 'GECS': 6.0, 'GER': 13.75, 'GRK': 3.3333, 'GS': 11.0,
        'HBRW': 13.4706, 'HECS': 14.0, 'HISP': 20.2381, 'HIST': 28.7273,
        'HRNS': 11.0, 'HS': 27.9865, 'HSSP': 24.0, 'IGS': 51.5, 'IMES': 37.0,
        'ITAL': 16.0, 'JAPN': 14.5714, 'JOUR': 21.2, 'LAT': 10.6667, 'LGLS':
        21.25, 'LING': 13.5, 'MATH': 19.4737, 'MUS': 13.2553, 'NBIO': 31.1667,
        'NEJS': 12.4286, 'NPSY': 48.0, 'PAX': 7.0, 'PE': 14.8929, 'PHIL':
        30.125, 'PHSC': 47.0, 'PHYS': 21.2917, 'POL': 26.3333, 'PSYC': 40.4706,
        'RECS': 14.0, 'REL': 36.0, 'RUS': 16.0, 'SAS': 15.0, 'SJSP': 8.0,
        'SOC': 34.2857, 'THA': 7.5333, 'UWS': 15.8462, 'WMGS': 20.0, 'YDSH':
        10.5} ],
    [ '2010 Spring' , {'AAAS': 17.8333, 'AMST': 29.5, 'ANTH': 27.0, 'ARBC':
        13.2, 'BCHM': 16.6, 'BIOL': 33.069, 'BIOP': 11.0, 'BISC': 36.3333,
        'BUS': 31.7059, 'CHEM': 28.0938, 'CHIN': 24.0, 'CHSC': 21.0, 'CLAS':
        14.5, 'COEX': 15.0, 'COML': 13.3333, 'CONT': 35.0, 'COSI': 24.3077,
        'CP': 14.0, 'ECON': 37.0, 'ED': 6.5, 'ENG': 20.9583, 'ENVS': 10.0,
        'FA': 20.2414, 'FILM': 63.0, 'FIN': 35.64, 'FREN': 17.7, 'FYS':
        12.1667, 'GECS': 23.0, 'GER': 12.3333, 'GRK': 7.75, 'GS': 13.0, 'HBRW':
        17.25, 'HISP': 17.6087, 'HIST': 22.6667, 'HRNS': 11.3333, 'HS':
        22.2326, 'HSSP': 33.3333, 'HUM': 27.0, 'IGS': 50.5, 'IMES': 17.0,
        'ITAL': 14.25, 'JAPN': 14.0, 'JOUR': 19.75, 'LAT': 8.5, 'LGLS': 18.0,
        'LING': 13.75, 'MATH': 18.3548, 'MUS': 10.6444, 'NBIO': 19.3333,
        'NEJS': 12.92, 'NPSY': 43.5, 'PAX': 24.0, 'PE': 17.3571, 'PHIL': 27.0,
        'PHYS': 19.7143, 'POL': 22.5517, 'PSYC': 44.0625, 'QBIO': 11.0, 'RECS':
        7.0, 'REL': 56.0, 'RUS': 10.5, 'SOC': 27.2105, 'THA': 8.3846, 'UWS':
        14.8529, 'WMGS': 17.8, 'YDSH': 10.0} ],
    [ '2010 Fall'   , {'AAAS': 24.1667, 'AMST': 28.2727, 'ANTH': 29.0714,
        'ARBC': 12.8333, 'BCHM': 29.75, 'BIOL': 38.9643, 'BIOP': 10.0, 'BIOT':
        9.0, 'BISC': 49.0, 'BUS': 34.0, 'CHEM': 32.7333, 'CHIN': 17.125,
        'CHSC': 20.0, 'CLAS': 35.2, 'COML': 15.0, 'COMP': 11.9167, 'COSI':
        21.9231, 'ECON': 45.7097, 'ECON/FIN': 18.0, 'ECS': 18.0, 'ED': 8.6667,
        'ENG': 22.3462, 'ENG/HIST': 16.0, 'ENVS': 33.5, 'FA': 18.9355, 'FILM':
        18.0, 'FIN': 42.7727, 'FREN': 14.8571, 'FYS': 11.4444, 'GECS': 11.0,
        'GER': 11.8, 'GRK': 8.0, 'GS': 11.0, 'HBRW': 14.2941, 'HISP': 19.5455,
        'HIST': 24.2778, 'HRNS': 11.7778, 'HS': 25.7711, 'HSSP': 26.1667,
        'HUM': 28.0, 'IECS': 9.0, 'IGS': 49.0, 'IMES': 57.0, 'ITAL': 18.75,
        'JAPN': 16.2, 'JOUR': 19.75, 'LAT': 13.3333, 'LGLS': 44.8333, 'LING':
        19.3333, 'MATH': 19.8571, 'MUS': 11.0909, 'NBIO': 35.1429, 'NEJS':
        14.4545, 'NPSY': 28.8, 'PAX': 6.0, 'PE': 15.4333, 'PHIL': 30.7368,
        'PHSC': 19.0, 'PHYS': 39.6875, 'POL': 23.1304, 'PSYC': 39.4211, 'RECS':
        17.0, 'RUS': 15.3333, 'SAS': 24.5, 'SJSP': 10.0, 'SOC': 30.3333, 'THA':
        9.4231, 'UWS': 17.08, 'WMGS': 23.3333, 'YDSH': 11.5} ],
    [ '2011 Spring' , {'AAAS': 18.2, 'AMST': 39.4545, 'ANTH': 40.4375, 'ARBC':
        10.0, 'BCHM': 19.1667, 'BIOL': 35.0, 'BIOT': 8.0, 'BISC': 31.0, 'BUS':
        32.1579, 'CBIO': 29.0, 'CHEM': 27.9032, 'CHIN': 17.0, 'CHSC': 40.0,
        'CLAS': 35.0, 'COML': 22.25, 'COMP': 9.5, 'CONT': 56.0, 'COSI':
        27.4286, 'ECON': 35.0263, 'ECON/FA': 30.0, 'ED': 8.4737, 'ENG': 24.037,
        'ENVS': 19.3333, 'FA': 17.7742, 'FILM': 53.5, 'FIN': 34.4643, 'FREN':
        17.6364, 'GECS': 17.6667, 'GER': 10.0, 'GRK': 8.0, 'GS': 10.0, 'HBRW':
        15.9231, 'HISP': 18.5, 'HIST': 25.2174, 'HRNS': 12.6667, 'HRNS/HS':
        8.0, 'HRNS/NEJ': 5.0, 'HS': 19.97, 'HSSP': 26.0, 'IGS': 30.0, 'IMES':
        15.0, 'ITAL': 15.75, 'JAPN': 12.1667, 'JOUR': 14.0, 'LAT': 14.0,
        'LGLS': 17.0, 'LGLS/POL': 54.0, 'LING': 19.8, 'MATH': 19.0345, 'MUS':
        9.5814, 'NBIO': 22.0, 'NEJS': 15.0, 'NEJS/SOC': 36.0, 'NPSY': 54.6,
        'PAX': 21.5, 'PE': 15.2, 'PHIL': 25.5263, 'PHYS': 34.875, 'POL':
        21.087, 'PSYC': 38.65, 'QBIO': 16.0, 'RECS': 10.5, 'REL': 26.5, 'RUS':
        15.0, 'SJSP': 18.0, 'SOC': 26.3333, 'THA': 9.8958, 'UWS': 15.6786,
        'WMGS': 24.2, 'YDSH': 7.0} ],
    [ '2011 Fall'   , {'AAAS': 19.6, 'AMST': 24.75, 'AMST/SOC': 14.0, 'ANTH':
        26.7895, 'ANTH/NEJ': 12.0, 'ARBC': 16.75, 'BCBP': 6.0, 'BCHM': 23.0,
        'BIOL': 43.5556, 'BIOT': 12.0, 'BISC': 17.0, 'BUS': 31.7222, 'CBIO':
        24.0, 'CHEM': 36.3636, 'CHIN': 21.375, 'CHSC': 19.0, 'CLAS': 21.0,
        'COML': 21.0, 'COMP': 11.3636, 'COSI': 27.75, 'ECON': 40.3889,
        'ECON/FIN': 16.0, 'ECS': 20.0, 'ED': 9.6667, 'ENG': 20.0333, 'ENVS':
        49.25, 'ESL': 8.5, 'FA': 19.1613, 'FILM': 39.5, 'FIN': 34.5357, 'FREN':
        17.1333, 'FYS': 14.8333, 'GER': 12.6667, 'GRK': 9.0, 'GS': 9.0, 'HBRW':
        13.4286, 'HECS': 18.0, 'HISP': 19.1739, 'HIST': 26.3, 'HRNS': 10.8333,
        'HS': 23.1957, 'HSSP': 27.6667, 'IGS': 50.0, 'IMES': 46.0, 'ITAL':
        16.6667, 'JAPN': 12.5714, 'JOUR': 21.6, 'LAT': 20.0, 'LGLS': 37.2,
        'LING': 20.0, 'MATH': 18.9211, 'MUS': 11.3125, 'NBIO': 32.2857, 'NEJS':
        11.3333, 'NPSY': 33.5, 'PAX': 6.0, 'PE': 16.0, 'PHIL': 33.3125, 'PHSC':
        92.0, 'PHYS': 29.75, 'POL': 25.0455, 'PSYC': 37.85, 'RECS': 8.0, 'RUS':
        13.3333, 'SAS': 34.5, 'SJSP': 10.0, 'SOC': 31.2667, 'SYS': 9.0, 'THA':
        12.0, 'UWS': 17.3077, 'WMGS': 27.0, 'YDSH': 12.0} ],
    [ '2012 Spring' , {'AAAS': 18.0, 'AMST': 28.2, 'ANTH': 27.3333, 'ARBC':
        10.25, 'BCBP': 5.0, 'BCHM': 23.8, 'BIOL': 33.3333, 'BIOT': 12.0,
        'BISC': 21.3333, 'BUS': 33.5238, 'CHEM': 31.3939, 'CHIN': 28.875,
        'CHSC': 31.0, 'CLAS': 40.3333, 'COML': 11.3333, 'COMP': 10.0, 'CONT':
        99.0, 'COSI': 34.2941, 'ECON': 34.8649, 'ECON/FIN': 36.0, 'ED': 9.4211,
        'ENG': 24.6897, 'ENVS': 22.0, 'ESL': 12.5, 'FA': 20.5, 'FILM': 47.5,
        'FIN': 32.9333, 'FREN': 19.0909, 'GECS': 42.5, 'GER': 8.5, 'GRK':
        9.6667, 'GS': 7.5, 'HBRW': 13.6667, 'HISP': 18.8636, 'HIST': 25.2,
        'HRNS': 14.8, 'HRNS/HS': 11.0, 'HS': 20.18, 'HSSP': 25.875, 'HUM':
        26.0, 'IGS': 48.3333, 'IMES': 25.0, 'ITAL': 14.5, 'JAPN': 12.75,
        'JOUR': 19.0, 'LAT': 16.5, 'LGLS': 16.8, 'LGLS/POL': 50.0, 'LING':
        17.8, 'MATH': 16.4516, 'MUS': 11.3265, 'NBIO': 30.3333, 'NEJS': 13.95,
        'NPSY': 43.2857, 'PAX': 47.0, 'PE': 16.8621, 'PHIL': 25.5625, 'PHYS':
        27.4286, 'POL': 17.7826, 'PSYC': 47.4, 'QBIO': 14.0, 'RECS': 6.5,
        'REL/SAS': 40.0, 'RUS': 15.0, 'SOC': 31.6316, 'SYS': 9.0, 'THA':
        13.2927, 'UWS': 16.5938, 'WMGS': 21.75, 'YDSH': 8.0} ],
    [ '2012 Fall'   , {'AAAS': 20.375, 'AMST': 32.1111, 'ANTH': 29.4583,
        'ANTH/ENG': 12.0, 'ARBC': 12.2, 'BCBP': 9.0, 'BCHM': 39.4, 'BIOL':
        37.9355, 'BIOT': 5.0, 'BISC': 30.0, 'BUS': 30.7895, 'CBIO': 43.0,
        'CHEM': 32.2941, 'CHIN': 17.1538, 'CHSC': 25.0, 'CLAS': 30.4,
        'CLAS/FA': 38.0, 'COML': 13.0, 'COMP': 11.5455, 'COSI': 33.125, 'ECON':
        39.1714, 'ECON/FIN': 14.0, 'ECS': 21.5, 'ED': 8.0, 'ENG': 24.4167,
        'ENVS': 34.0, 'ESL': 8.9, 'FA': 17.6333, 'FILM': 68.0, 'FIN': 35.7692,
        'FREN': 15.375, 'FYS': 9.2857, 'GER': 12.2, 'GRK': 9.0, 'GS': 11.0,
        'HBRW': 14.3846, 'HISP': 14.8929, 'HIST': 23.5217, 'HRNS': 11.2, 'HS':
        21.7222, 'HSSP': 25.1429, 'IGS': 54.0, 'IMES': 33.0, 'ITAL': 13.8333,
        'JAPN': 12.0, 'JOUR': 16.0, 'LAT': 16.0, 'LGLS': 46.1667, 'LING': 26.6,
        'MATH': 20.6667, 'MUS': 9.36, 'NBIO': 28.5714, 'NEJS': 11.7778, 'NPSY':
        30.75, 'PAX': 5.0, 'PE': 16.1875, 'PHIL': 22.6364, 'PHYS': 35.4375,
        'PMED': 7.0, 'POL': 23.08, 'PSYC': 44.0526, 'QBIO': 12.0, 'RECS': 9.0,
        'RECS/THA': 6.0, 'RUS': 15.0, 'SAS': 12.3333, 'SJSP': 15.0, 'SOC':
        34.4444, 'SYS': 11.0, 'THA': 15.2424, 'UWS': 17.1667, 'WMGS': 18.0,
        'YDSH': 9.5} ],
    [ '2013 Spring' , {'AAAS': 17.6667, 'AMST': 40.7, 'ANTH': 30.5625, 'ARBC':
        9.2, 'BCBP': 9.0, 'BCHM': 29.0, 'BIOL': 33.5, 'BIOT': 19.0, 'BISC':
        37.5, 'BUS': 28.8667, 'CHEM': 29.0588, 'CHIN': 17.7778, 'CHSC': 32.0,
        'CLAS': 43.3333, 'CLAS/THA': 11.0, 'COML': 8.6667, 'COML/ENG': 46.0,
        'COMP': 11.3333, 'CONT': 102.0, 'COSI': 35.0, 'ECON': 34.2632,
        'ECON/FA': 36.0, 'ECON/FIN': 13.5, 'ED': 7.95, 'ENG': 22.8889,
        'ENG/HIST': 10.0, 'ENVS': 21.6667, 'ESL': 6.0, 'FA': 17.0303, 'FILM':
        17.0, 'FIN': 36.1111, 'FREN': 14.3846, 'FYS': 14.5, 'GECS': 20.0,
        'GER': 10.5, 'GRK': 10.3333, 'GS': 13.0, 'HBRW': 14.5, 'HISP': 15.7895,
        'HIST': 21.3182, 'HRNS': 8.8, 'HRNS/HS': 12.0, 'HS': 16.514, 'HSSP':
        27.4, 'HUM': 13.0, 'IGS': 46.6667, 'IGS/SAS': 8.0, 'ITAL': 11.5,
        'JAPN': 23.6667, 'JOUR': 18.5, 'LAT': 16.5, 'LGLS': 26.6, 'LGLS/POL':
        66.0, 'LING': 19.4, 'MATH': 20.2667, 'MUS': 9.375, 'NBIO': 18.8333,
        'NEJS': 10.8, 'NPSY': 48.6667, 'PAX': 22.0, 'PE': 15.5152, 'PHIL':
        21.4545, 'PHYS': 32.375, 'PMED': 7.0, 'POL': 25.1364, 'PSYC': 48.3125,
        'QBIO': 18.0, 'RECS': 12.0, 'REL': 148.0, 'REL/SAS': 11.0, 'RUS':
        13.75, 'SAS': 16.0, 'SJSP': 21.0, 'SOC': 25.75, 'SYS': 11.0, 'THA':
        14.9032, 'UWS': 15.1111, 'WMGS': 21.8, 'YDSH': 7.0} ],
    [ '2013 Fall'   , {'AAAS': 17.7143, 'AMST': 22.6364, 'ANTH': 25.1053,
        'ARBC': 10.8, 'BCBP': 4.0, 'BCHM': 60.3333, 'BIBC': 26.0, 'BIOL':
        38.9744, 'BIOT': 10.0, 'BISC': 17.5, 'BUS': 30.3571, 'CHEM': 34.9688,
        'CHIN': 14.0, 'CHSC': 21.0, 'CLAS': 26.1667, 'COMH': 4.0, 'COML': 10.5,
        'COML/ENG': 18.0, 'COMP': 11.5882, 'COSI': 43.2778, 'ECON': 38.4571,
        'ED': 11.7143, 'ENG': 19.25, 'ENVS': 44.5, 'ESL': 12.0, 'FA': 15.9091,
        'FILM': 30.5, 'FIN': 33.871, 'FREN': 13.375, 'FYS': 9.25, 'GECS': 56.0,
        'GER': 12.2, 'GRK': 9.0, 'GS': 7.0, 'GSAS': 5.0, 'HBRW': 14.1667,
        'HISP': 15.5926, 'HIST': 25.0, 'HRNS': 12.4, 'HS': 23.1333, 'HSSP':
        31.7143, 'IGS': 39.0, 'IMES': 33.0, 'ITAL': 13.8333, 'JAPN': 11.8333,
        'JOUR': 15.5, 'KOR': 19.0, 'LAT': 18.6667, 'LGLS': 34.1667, 'LING':
        26.1667, 'MATH': 21.0256, 'MUS': 11.2, 'NBIO': 35.125, 'NEJS': 11.0,
        'NPSY': 31.0, 'PAX': 7.5, 'PE': 14.8286, 'PHIL': 22.0556, 'PHSC': 98.0,
        'PHYS': 43.9333, 'PMED': 5.0, 'POL': 24.7391, 'PSYC': 46.0588, 'RECS':
        5.0, 'RUS': 14.6667, 'SAS': 21.0, 'SJSP': 9.0, 'SOC': 30.6111, 'SYS':
        16.0, 'THA': 15.7931, 'UWS': 17.1154, 'WMGS': 17.0, 'YDSH': 9.0} ],
    [ '2014 Spring' , {'AAAS': 34.8, 'AMST': 40.3, 'ANTH': 26.8824, 'ARBC':
        7.8, 'BCBP': 4.6667, 'BCHM': 33.0, 'BIOL': 34.9024, 'BIOT': 11.5,
        'BISC': 40.5, 'BUS': 31.0909, 'CBIO': 36.0, 'CHEM': 29.9394, 'CHIN':
        14.6923, 'CHSC': 21.0, 'CLAS': 20.8, 'COMH': 4.0, 'COML': 24.0,
        'COML/THA': 6.0, 'COMP': 9.3333, 'CONT': 87.0, 'COSI': 32.0, 'ECON':
        36.4872, 'ECON/FIN': 18.0, 'ECS': 13.0, 'ED': 12.2381, 'ENG': 22.037,
        'ENVS': 18.3333, 'ESL': 7.25, 'FA': 21.4516, 'FILM': 14.0, 'FIN':
        28.4375, 'FREN': 15.1538, 'FYS': 6.5, 'GECS': 17.0, 'GER': 9.75, 'GRK':
        11.3333, 'GS': 6.0, 'GSAS': 5.0, 'HBRW': 11.0, 'HISP': 16.0909, 'HIST':
        22.3636, 'HRNS': 9.0, 'HRNS/HS': 10.0, 'HS': 17.9035, 'HSSP': 25.4167,
        'HUM': 11.0, 'IGS': 56.0, 'INT': 8.0, 'ITAL': 12.0, 'JAPN': 11.4,
        'JOUR': 13.0, 'KOR': 12.0, 'LAT': 12.0, 'LGLS': 24.7143, 'LING': 20.6,
        'MATH': 19.9667, 'MUS': 9.3673, 'NBIO': 26.7143, 'NEJS': 10.0417,
        'NPSY': 59.2, 'PAX': 35.0, 'PE': 14.4839, 'PHIL': 21.8, 'PHYS':
        38.9333, 'PMED': 5.0, 'POL': 19.7391, 'PSYC': 40.0476, 'QBIO': 11.0,
        'RECS': 7.5, 'REL': 100.0, 'RUS': 10.5, 'SAS': 18.3333, 'SOC': 26.9474,
        'SYS': 16.0, 'THA': 14.4062, 'UWS': 15.2333, 'WMGS': 21.8, 'YDSH': 9.0}
    ],
    [ '2014 Fall'   , {'AAAS': 23.1667, 'AMST': 26.0909, 'ANTH': 27.5263,
        'ARBC': 10.0, 'BCBP': 3.0, 'BCHM': 47.25, 'BIBC': 29.0, 'BIOL':
        53.3214, 'BIOT': 8.0, 'BISC': 18.0, 'BUS': 31.1556, 'CBIO': 21.0,
        'CHEM': 35.3548, 'CHIN': 15.8667, 'CHSC': 28.0, 'CLAS': 22.5, 'COMH':
        1.0, 'COMP': 10.7143, 'COSI': 68.6923, 'ECON': 42.4545, 'ECS': 15.0,
        'ED': 12.2273, 'ENG': 21.8, 'ENVS': 40.0, 'ESL': 11.0, 'FA': 19.0,
        'FILM': 45.5, 'FIN': 32.7407, 'FREN': 13.5333, 'FYS': 4.0, 'GER':
        11.1667, 'GRK': 7.0, 'GS': 10.0, 'HBRW': 10.7692, 'HINDI': 9.0, 'HISP':
        15.5769, 'HIST': 22.9, 'HOID': 13.0, 'HRNS': 14.4, 'HS': 24.1413,
        'HSSP': 24.0, 'IGS': 58.0, 'IMES': 29.0, 'INT': 4.0, 'ITAL': 12.0,
        'JAPN': 12.4444, 'JOUR': 12.5, 'KOR': 15.0, 'LAT': 14.0, 'LGLS':
        37.6667, 'LING': 26.8, 'MATH': 21.975, 'MUS': 9.1053, 'NBIO': 35.1429,
        'NEJS': 11.04, 'NPHY': 15.0, 'NPSY': 33.0, 'PAX': 6.0, 'PE': 16.4571,
        'PHIL': 27.6, 'PHYS': 41.5294, 'PMED': 6.0, 'POL': 30.1364, 'PSYC':
        44.2632, 'RECS': 6.5, 'REL': 19.0, 'REL/SAS': 10.0, 'RUS': 11.25,
        'SAS': 14.5, 'SJSP': 5.0, 'SOC': 33.4375, 'THA': 13.9643, 'UWS':
        17.3462, 'WMGS': 29.0, 'YDSH': 5.0} ],
    [ '2015 Spring' , {'AAAS': 15.5714, 'AAAS/WGS': 60.0, 'AMST': 23.6154,
        'ANTH': 24.3636, 'ARBC': 7.0, 'BCBP': 1.6667, 'BCHM': 30.1667, 'BIOL':
        30.1522, 'BIOT': 13.0, 'BISC': 40.0, 'BUS': 29.4651, 'CAST': 15.0,
        'CHEM': 31.3824, 'CHIN': 17.0714, 'CHSC': 59.0, 'CLAS': 19.2, 'COML':
        6.6667, 'COML/ENG': 35.5, 'COMP': 9.1667, 'CONT': 80.0, 'COSI':
        53.0526, 'ECON': 37.9744, 'ECON/FIN': 26.0, 'ED': 10.3, 'ENG': 23.7917,
        'ENVS': 15.6667, 'ESL': 10.75, 'FA': 16.9655, 'FA/NEJS': 16.0, 'FILM':
        16.0, 'FIN': 29.069, 'FREN': 14.25, 'FYS': 22.0, 'GECS': 25.5, 'GER':
        11.75, 'GRK': 7.6667, 'GS': 11.0, 'HBRW': 13.7778, 'HECS': 5.0,
        'HINDI': 3.0, 'HISP': 14.7273, 'HIST': 22.4286, 'HRNS': 12.5,
        'HRNS/HS': 17.0, 'HS': 18.1681, 'HSSP': 28.2308, 'IGS': 47.0, 'INT':
        4.0, 'ITAL': 10.75, 'JAPN': 13.0, 'JOUR': 19.5, 'KOR': 11.0, 'LAT':
        7.5, 'LGLS': 26.0, 'LING': 19.0, 'MATH': 22.5312, 'MUS': 7.8704,
        'NBIO': 32.1667, 'NEJS': 8.48, 'NPSY': 41.1667, 'PAX': 21.5, 'PE':
        16.0345, 'PHIL': 22.0588, 'PHYS': 36.4706, 'PMED': 6.0, 'POL': 20.96,
        'PSYC': 39.1053, 'QBIO': 14.0, 'RECS': 6.5, 'REL': 101.0, 'RUS': 8.0,
        'SOC': 24.9375, 'SQS': 26.0, 'THA': 14.0333, 'UWS': 16.931, 'WMGS':
        18.5, 'YDSH': 3.5} ],
    [ '2015 Fall'   , {'AAAS': 21.8571, 'AMST': 23.9091, 'AMST/MUS': 9.0,
        'ANTH': 25.6, 'ARBC': 10.2, 'BCBP': 3.0, 'BCHM': 53.5, 'BIBC': 28.0,
        'BIOL': 36.4286, 'BIOT': 7.0, 'BISC': 20.0, 'BUS': 28.0465, 'CHEM':
        31.7576, 'CHIN': 16.1429, 'CHSC': 16.5, 'CLAS': 28.5, 'COMH': 5.0,
        'COMP': 11.7692, 'COSI': 63.9375, 'ECON': 39.4444, 'ED': 9.7273, 'EL':
        14.5714, 'ENG': 17.1852, 'ENVS': 31.0, 'ESL': 16.75, 'FA': 15.8621,
        'FA/NEJS': 10.0, 'FILM': 23.0, 'FIN': 29.3333, 'FREN': 14.6154, 'FYS':
        10.5, 'GECS': 16.0, 'GER': 14.0, 'GRK': 9.0, 'GS': 3.0, 'HBRW':
        11.6364, 'HINDI': 7.0, 'HISP': 15.32, 'HIST': 25.4211, 'HIST/SOC':
        12.0, 'HOID': 27.0, 'HRNS': 14.5, 'HS': 23.7732, 'HSSP': 25.7143,
        'IGS': 55.0, 'IMES': 15.5, 'INT': 1.0, 'ITAL': 11.0, 'JAPN': 24.25,
        'JOUR': 13.0, 'KOR': 22.0, 'LALS': 10.0, 'LAT': 11.6667, 'LGLS':
        50.8333, 'LING': 30.2, 'MATH': 22.0, 'MUS': 9.4528, 'NBIO': 35.0,
        'NEJS': 10.1667, 'NPSY': 27.25, 'PAX': 8.0, 'PE': 15.0588, 'PHIL':
        27.1111, 'PHSC': 91.0, 'PHYS': 30.2222, 'PMED': 7.0, 'POL': 22.1154,
        'PSYC': 41.6667, 'RECS': 3.0, 'REL': 38.0, 'RUS': 12.3333, 'SAS': 8.0,
        'SJSP': 8.0, 'SOC': 31.4667, 'SQS': 18.0, 'THA': 14.64, 'UWS': 17.3103,
        'WMGS': 21.0} ],
    [ '2016 Spring' , {'AAAS': 17.8571, 'AAAS/WGS': 57.0, 'AMST': 28.4545,
        'AMST/MUS': 17.0, 'ANTH': 25.4783, 'ARBC': 9.25, 'BCBP': 5.0, 'BCHM':
        41.25, 'BIOL': 30.025, 'BIOT': 13.0, 'BISC': 36.0, 'BUS': 29.4872,
        'CAST': 19.0, 'CBIO': 37.0, 'CHEM': 28.6286, 'CHIN': 18.8462, 'CHSC':
        34.0, 'CLAS': 31.6667, 'COMH': 8.0, 'COML': 25.5, 'COML/ENG': 11.0,
        'COML/HOI': 10.0, 'COMP': 9.4, 'CONT': 91.0, 'COSI': 34.55, 'EBIO':
        17.0, 'ECON': 40.3947, 'ECON/FA': 27.0, 'ECON/FIN': 24.5, 'ED':
        11.0476, 'EL': 9.3333, 'ENG': 15.5, 'ENVS': 18.0, 'ESL': 16.5, 'FA':
        15.8966, 'FILM': 24.0, 'FIN': 28.56, 'FREN': 14.8182, 'GER': 11.0,
        'GRK': 7.6667, 'GS': 3.0, 'HBRW': 13.125, 'HINDI': 3.0, 'HISP':
        15.5714, 'HIST': 21.4091, 'HRNS': 10.6667, 'HRNS/HS': 17.0, 'HS':
        19.7544, 'HSSP': 23.0, 'HUM': 9.0, 'IGS': 56.0, 'INT': 5.0, 'ITAL':
        9.25, 'JAPN': 15.4, 'JOUR': 17.25, 'KOR': 21.0, 'LAT': 10.0, 'LGLS':
        27.5, 'LING': 25.75, 'MATH': 24.4516, 'MUS': 8.7925, 'NBIO': 33.6667,
        'NEJS': 8.6071, 'NPSY': 65.5, 'PAX': 20.5, 'PE': 13.5517, 'PHIL':
        25.8421, 'PHYS': 28.0625, 'PMED': 8.0, 'POL': 22.069, 'PORT': 13.0,
        'PSYC': 43.1176, 'QBIO': 18.0, 'RECS': 9.0, 'REL': 69.0, 'RUS': 7.0,
        'SAS': 30.0, 'SOC': 18.1875, 'SQS': 10.5, 'THA': 15.0968, 'UWS':
        17.7727, 'WMGS': 24.6667} ],
    [ '2016 Fall'   , {'AAAS': 20.625, 'AMST': 21.3333, 'ANTH': 24.4, 'ARBC':
        8.75, 'BCBP': 7.0, 'BCHM': 41.25, 'BIBC': 20.0, 'BIOL': 37.7317,
        'BIOT': 14.0, 'BISC': 17.0, 'BUS': 28.475, 'CAST': 13.0, 'CBIO': 20.0,
        'CHEM': 35.6667, 'CHIN': 17.25, 'CHSC': 18.0, 'CLAS': 19.2857, 'COMH':
        6.0, 'COML': 15.0, 'COML/ENG': 32.0, 'COMP': 10.3529, 'COSI': 67.9375,
        'ECON': 39.5714, 'ECS': 8.0, 'ED': 11.5652, 'EL': 14.25, 'ENG':
        17.2609, 'ENVS': 49.5, 'ESL': 16.25, 'FA': 17.6667, 'FILM': 18.0,
        'FIN': 33.8571, 'FREN': 14.4545, 'FYS': 16.0, 'GER': 12.6, 'GRK': 7.0,
        'GS': 15.0, 'HBRW': 10.4, 'HISP': 15.75, 'HIST': 25.5714, 'HRNS': 13.5,
        'HS': 22.8431, 'HSSP': 22.7, 'HUM/UWS': 28.0, 'IGS': 60.5, 'IMES':
        21.0, 'INT': 2.0, 'ITAL': 14.8, 'JAPN': 16.6667, 'JOUR': 13.3333,
        'KOR': 19.3333, 'LAT': 13.3333, 'LGLS': 42.625, 'LING': 23.1429,
        'MATH': 24.6053, 'MUS': 10.3148, 'NBIO': 38.0, 'NEJS': 8.8636, 'NPSY':
        39.75, 'PAX': 6.0, 'PE': 13.9722, 'PHIL': 30.5, 'PHYS': 20.5926,
        'PMED': 8.0, 'POL': 23.8, 'PORT': 7.0, 'PSYC': 43.5882, 'RECS': 5.0,
        'RECS/THA': 8.0, 'REL': 54.0, 'RUS': 11.0, 'SAS': 9.0, 'SJSP': 7.0,
        'SOC': 27.4211, 'THA': 13.7778, 'UWS': 17.1923, 'WMGS': 27.4, 'YDSH':
        6.0} ],
    [ '2017 Spring' , {'AAAS': 18.2857, 'AAAS/ENG': 45.0, 'AAAS/FA': 22.0,
        'AMST': 16.7778, 'ANTH': 23.2609, 'ARBC': 5.6, 'BCBP': 8.3333, 'BCHM':
        42.75, 'BIOL': 28.9783, 'BIOT': 12.5, 'BISC': 20.0, 'BUS': 28.3902,
        'CAST': 17.0, 'CBIO': 11.0, 'CHEM': 28.2121, 'CHIN': 18.8667, 'CLAS':
        21.5, 'COMH': 13.0, 'COML': 14.0, 'COMP': 11.25, 'CONT': 112.0, 'COSI':
        47.6316, 'ECON': 42.1429, 'ECON/FIN': 24.3333, 'ECON/HIS': 26.0, 'ED':
        11.9, 'EL': 12.6667, 'ENG': 17.1538, 'ENVS': 14.0, 'ENVS/THA': 17.0,
        'ESL': 15.25, 'FA': 17.0, 'FILM': 29.3333, 'FIN': 32.0, 'FREN':
        13.9167, 'FYS': 10.0, 'GER': 10.25, 'GRK': 6.0, 'GS': 13.0, 'HBRW':
        9.2857, 'HISP': 14.3636, 'HIST': 20.1304, 'HRNS': 8.5, 'HRNS/HS': 12.0,
        'HS': 19.6931, 'HSSP': 27.4, 'HUM': 17.0, 'IGS': 28.0, 'IGS/LGLS':
        10.0, 'INT': 1.0, 'ITAL': 12.25, 'JAPN': 14.5, 'JOUR': 14.8, 'KOR':
        15.0, 'LALS': 11.0, 'LAT': 9.0, 'LGLS': 24.2, 'LING': 20.5, 'MATH':
        24.7059, 'MUS': 9.3673, 'NBIO': 33.1429, 'NEJS': 8.5652, 'NPSY':
        41.6667, 'PAX': 36.0, 'PE': 12.8387, 'PHIL': 22.8947, 'PHYS': 21.2727,
        'PMED': 7.0, 'POL': 27.8889, 'PSYC': 36.5294, 'QBIO': 16.0, 'RECS':
        4.5, 'REL': 135.0, 'RUS': 10.25, 'SOC': 26.1667, 'SQS': 21.5, 'THA':
        16.6786, 'UWS': 17.8462, 'WMGS': 15.0, 'YDSH': 3.0} ],
    [ '2017 Fall'   , {'AAAS': 19.8, 'AAAS/WGS': 54.0, 'AAPI': 16.0, 'AMST':
        17.0, 'AMST/MUS': 24.0, 'ANTH': 20.92, 'ARBC': 8.5, 'BCBP': 4.0,
        'BCHM': 31.1667, 'BIOL': 37.9268, 'BISC': 22.0, 'BUS': 26.8542,
        'BUS/ECON': 12.0, 'CAST': 9.0, 'CBIO': 20.0, 'CHEM': 38.5, 'CHIN':
        18.6154, 'CHSC': 32.0, 'CLAS': 15.2, 'COMH': 4.0, 'COML': 8.0,
        'COML/ENG': 9.0, 'COMP': 9.1538, 'COSI': 58.0588, 'ECON': 38.5,
        'ECON/FIN': 13.0, 'ECS': 16.0, 'ED': 10.5714, 'EL': 12.2857, 'ENG':
        18.16, 'ENVS': 49.0, 'ESL': 13.75, 'FA': 15.129, 'FILM': 17.0, 'FIN':
        34.2353, 'FREN': 13.0, 'FYS': 11.0, 'GER': 12.0, 'GRK': 10.0, 'GS':
        7.5, 'HBRW': 12.7, 'HISP': 16.1667, 'HIST': 20.1429, 'HIST/SOC': 12.0,
        'HRNS': 14.0, 'HS': 23.3118, 'HSSP': 20.75, 'HUM/UWS': 13.0, 'IGS':
        62.0, 'IMES': 24.0, 'INT': 4.0, 'ITAL': 11.1667, 'JAPN': 19.2222,
        'JOUR': 18.5, 'KOR': 15.6667, 'LAT': 12.6667, 'LGLS': 46.5, 'LING':
        24.5, 'MATH': 23.878, 'MUS': 10.7273, 'NBIO': 41.8, 'NEJS': 9.4286,
        'NPHY': 16.0, 'NPSY': 40.4, 'PAX': 6.0, 'PE': 15.2727, 'PHIL': 27.125,
        'PHYS': 19.9615, 'PMED': 3.0, 'POL': 27.25, 'PORT': 6.0, 'PSYC':
        40.4118, 'RECS': 7.0, 'REL': 47.0, 'REL/SAS': 7.0, 'RUS': 9.75, 'SAS':
        9.0, 'SOC': 27.8667, 'THA': 16.0, 'UWS': 17.0357, 'WMGS': 29.4, 'YDSH':
        7.0} ],
    [ '2018 Spring' , {'AAAS': 16.4, 'AAAS/FA': 19.0, 'AAPI': 16.0, 'AMST':
        18.2857, 'AMST/MUS': 18.0, 'ANTH': 25.3158, 'ARBC': 6.0, 'BCBP': 4.5,
        'BCHM': 30.25, 'BIBC': 7.0, 'BIOL': 30.3864, 'BIOT': 15.5, 'BUS':
        28.0732, 'BUS/FIN': 25.0, 'CA': 35.0, 'CAST': 15.0, 'CBIO': 30.0,
        'CHEM': 31.0, 'CHIN': 19.6667, 'CLAS': 12.0, 'COMH': 3.0, 'COML': 10.0,
        'COML/HUM': 12.0, 'COMP': 11.0, 'COSI': 39.2273, 'EBIO': 18.0, 'ECON':
        38.3714, 'ECON/FA': 25.0, 'ECON/FIN': 32.0, 'ECON/HIS': 26.0, 'ECS':
        3.0, 'ED': 10.1364, 'EL': 11.8, 'ENG': 15.4286, 'ENVS': 17.5, 'ESL':
        13.0, 'FA': 15.4138, 'FA/NEJS': 10.0, 'FA/RECS': 9.0, 'FILM': 34.6667,
        'FIN': 30.8889, 'FREN': 13.1667, 'GECS': 23.6667, 'GER': 9.75, 'GRK':
        12.0, 'GS': 8.0, 'HBRW': 12.0, 'HISP': 16.75, 'HIST': 20.8824, 'HRNS':
        7.2, 'HRNS/HS': 11.0, 'HS': 21.7732, 'HSSP': 23.5833, 'IGS': 34.0,
        'IGS/LGLS': 12.0, 'INT': 7.0, 'ITAL': 10.0, 'JAPN': 15.5, 'JOUR':
        15.6667, 'KOR': 10.3333, 'LALS': 12.0, 'LAT': 9.5, 'LGLS': 48.8333,
        'LING': 26.5, 'MATH': 24.9697, 'MUS': 9.24, 'NBIO': 26.125, 'NEJS':
        8.3846, 'NPSY': 39.5, 'PAX': 39.0, 'PE': 14.1935, 'PHIL': 31.3158,
        'PHSC': 151.0, 'PHYS': 19.7273, 'PMED': 3.0, 'POL': 30.3077, 'PSYC':
        42.4375, 'QBIO': 15.0, 'RECS': 9.0, 'REL': 61.0, 'RUS': 8.0, 'SOC':
        24.1875, 'SQS': 9.0, 'THA': 13.303, 'UWS': 16.84, 'WMGS': 20.75,
        'YDSH': 5.0} ],
    [ '2018 Fall'   , {'AAAS': 22.1429, 'AAPI': 18.0, 'AMST': 12.0, 'AMST/ANT':
        11.0, 'AMST/ENG': 14.0, 'AMST/MUS': 24.0, 'ANTH': 28.25, 'ARBC': 9.75,
        'BCBP': 3.0, 'BCHM': 40.0, 'BIOL': 34.4468, 'BISC': 24.0, 'BUS':
        29.7609, 'BUS/ECON': 18.0, 'BUS/FIN': 48.0, 'CAST': 19.0, 'CBIO': 14.0,
        'CHEM': 41.8462, 'CHIN': 16.0, 'CHSC': 16.0, 'CLAS': 19.0, 'COML':
        13.0, 'COML/ENG': 14.0, 'COMP': 8.8889, 'COSI': 65.2941, 'ECON':
        38.9688, 'ECON/FIN': 33.0, 'ECON/HIS': 22.0, 'ECS': 7.0, 'ECS/ENG':
        22.0, 'ED': 10.8, 'EL': 21.0, 'ENG': 19.5, 'ENVS': 44.6667, 'FA':
        13.5588, 'FILM': 16.0, 'FIN': 37.303, 'FREN': 11.7692, 'FYS': 18.0,
        'GECS': 7.0, 'GER': 12.75, 'GRK': 8.3333, 'GS': 5.0, 'HBRW': 12.0,
        'HISP': 16.44, 'HIST': 22.5263, 'HIST/SOC': 7.0, 'HRNS': 2.6667, 'HS':
        13.7303, 'HSSP': 21.3333, 'HUM': 10.0, 'HUM/UWS': 20.0, 'IGS': 71.0,
        'IGS/SAS': 6.0, 'IMES': 14.5, 'INT': 1.0, 'ITAL': 13.0, 'JAPN': 18.2,
        'JOUR': 14.3333, 'KOR': 17.6667, 'LAT': 19.3333, 'LGLS': 55.8571,
        'LING': 29.1667, 'MATH': 24.15, 'MUS': 9.3659, 'NBIO': 28.3333, 'NEJS':
        10.5556, 'NPHY': 20.0, 'NPSY': 44.2, 'PE': 20.25, 'PHIL': 26.7222,
        'PHYS': 20.1154, 'PMED': 4.0, 'POL': 20.7619, 'PSYC': 50.3077, 'RECS':
        5.0, 'RECS/THA': 17.0, 'REL': 35.0, 'RUS': 8.0, 'SAS': 11.5, 'SJSP':
        3.0, 'SOC': 25.0769, 'THA': 15.8421, 'UWS': 17.4667, 'WMGS': 23.0,
        'YDSH': 4.5} ],
]
