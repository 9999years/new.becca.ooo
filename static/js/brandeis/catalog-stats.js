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

function students_per_subject() {
    let data = google.visualization.arrayToDataTable([
        ['Subject', 'Average students / course' ],
        ['IGS', 52.07017543859649],
        ['REL', 46.64],
        ['NPSY', 40.153225806451616],
        ['PSYC', 39.416342412451364],
        ['COSI', 38.0622009569378],
        ['ECON', 38.029013539651835],
        ['FILM', 36.05],
        ['CA', 35.0],
        ['SJSP', 9.538461538461538],
        ['ED', 9.497277676950999],
        ['RECS', 9.195652173913043],
        ['GS', 8.833333333333334],
        ['PORT', 8.666666666666666],
        ['YDSH', 8.23913043478261],
        ['GRK', 7.815789473684211],
        ['BIPH', 7.25],
        ['SECS', 6.0],
        ['PMED', 5.846153846153846],
        ['BIOP', 5.714285714285714],
        ['HINDI', 5.5],
        ['COMH', 5.333333333333333],
        ['GSAS', 5.0],
        ['BCBP', 4.3],
        ['INT', 3.7],
    ])

    let chart = new google.visualization.BarChart($('students_per_subject'))
    let opts = {
        title: 'Average students per course by subject',
        height: 750,
        chartArea: {width: '80%', height: '90%'},
        hAxis: {
            title: 'Students per course',
        },
        vAxis: {
            title: 'Subject',
            showTextEvery: 1,
        },
        legend: {
            position: 'none'
        },
    }
    chart.draw(data, opts)
}

function draw() {
    courses_per_semester()
    stacked_subject_courses_per_semester()
    subject_courses_per_semester($('subject_chooser').value)
    corr_subject_courses_per_semester($('subject_chooser').value)
    course_enrollments()
    students_per_subject()
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
