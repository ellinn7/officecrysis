var boss_name='';

var structure=[
    {
        'name':'Ramones',
        'id':'ramones',
        'plan_quant':4,
        'employees':[],
    },
    {
        'name':'Sex Pistols',
        'id':'sexpistols',
        'plan_quant':4,
        'employees':[]
    }
];

var aspirants=[
    {
        'name':'Johnny',
        'id':1,
        'prof':'guitar',
        'salary':500,
    },
    {
        'name':'Joey',
        'id':2,
        'prof':'vocal, guitar',
        'salary':600,
    },
    {
        'name':'DeeDee',
        'id':3,
        'prof':'percussion',
        'salary':400,
    },
    {
        'name':'Tommy',
        'id':4,
        'prof':'guitar',
        'salary':700,
    },
    {
        'name':'Glenn',
        'id':10,
        'prof':'bass',
        'salary':800,
    },
    {
        'name':'Johnny Rotten',
        'id':5,
        'prof':'frontman, vocal',
        'salary':1200,
        'status':1                
    },
    {
        'name':'Steve Johnes',
        'id':6,
        'prof':'guitar',
        'salary':1000,            
    },
    {
        'name':'Paul Cook',
        'id':7,
        'prof':'percussion',
        'salary':1000,             
    },
    {
        'name':'Sid Vicius',
        'id':8,
        'prof':'bass&badass',
        'salary':800,             
    },
    {
        'name':'Nancy',
        'id':9,
        'prof':'gruppie',
        'salary':100,     
    }
]

var balance=10000;
var month=1;

var start_menu = document.getElementById('start_menu');
var dialog = document.getElementById('dialog');
var secr_repl=document.getElementById('secr_repl');
var to_staff=document.getElementById('to_staff');
var office=document.getElementById('office');
var street=document.getElementById('street');
var street_back=document.getElementById('street_back');
var management = document.getElementById('management');
var balance_view=document.getElementById('balance');
var pay_salary=document.getElementById('pay_salary');
var close_month=document.getElementById('close_month');
var month_view=document.getElementById('month');

getStaff();

var firable=document.getElementsByClassName('firable');
var hire=document.getElementsByClassName('hire');

document.getElementById('start_button').onclick = function() {
    hide(start_menu);
    secr_repl.textContent = '- Здрасьте, босс! Простите, забыл, как вас зовут, босс...';
    show(dialog);
}

document.getElementById('boss_name').onchange = function() {
    boss_name=document.getElementById('boss_name').value;
    secr_repl.textContent = '- '+boss_name+', все плохо! Кризис! На инвесторов наложили санкции, конверсия сайтов падает! Что будем делать, босс?';
    hide(document.getElementById('div_boss_name'));
    show(document.getElementById('div_to_staff'));
}

to_staff.onclick = function() {
    hide(to_staff);
    hide(secr_repl);
    month_view.textContent = getMonth();
    balance_view.textContent = getBalance();
    showOffice();
}

street_back.onclick = function() {
    hide(street);
    showOffice();
}

pay_salary.onclick = function() {
    countSalary();
    balance_view.textContent=getBalance();
}

close_month.onclick = function() {
    month++;
    month_view.textContent=getMonth();
}

for(var i=0;i<firable.length;i++) {
    firable[i].onclick=function() {
        if(confirm('Уволить?')) {
            firing(this.id);
        }
    }
}

for(var i=0;i<hire.length;i++) {
    hire[i].onclick=function() {
        var hire_ids=this.id.split('_');
        var dep=hire_ids[0];
        hideOffice();
        getAspirants();
        var hirable=document.getElementsByClassName('hirable');
        summaryOnClick();
        show(street);
        for(var i=0;i<hirable.length;i++) {
            hirable[i].onclick=function() {
                if(confirm('Нанять?')) {
                    hiring(this.id,dep);
                }
            }
        }
    }
}

function countSalary() {
    var sum_salary=0;
    for(var i=0;i<structure.length;i++) {
        for(var j=0;j<structure[i].employees.length;j++) {
            sum_salary+=structure[i].employees[j].salary;
        }
    }
    balance=balance-sum_salary;
}

function getMonth() {
    return "Месяц "+month;
}

function getBalance() {
    return "Баланс: "+balance+" $";
}

function firing(id) {
    var ids=id.split('_');
    var id_employee=ids[0]+'_'+ids[1];
    for(var j=0;j<structure.length;j++) {
        if(structure[j].id==ids[0]) {
            var employees=structure[j].employees;
            for(var l=0;l<employees.length;l++) {
                if(employees[l].id==ids[1]) {
                    aspirants.push(employees[l]);
                    employees.splice(l,1);
                    break;
                }
            }
        }
    }
    document.getElementById(id).remove(); //_summary
    document.getElementById(id_employee).remove(); //_info
}

function hiring(id,dep) {
    var ids=id.split('_');
    for(var i=0;i<aspirants.length;i++) {
        if(aspirants[i].id==ids[0]) {
            addEmployee(dep,aspirants[i]);
            formPersonDivs(document.getElementById(dep),dep+'_'+ids[0],aspirants[i],'firable');
            aspirants.splice(i,1);
            break;
        }
    }
    document.getElementById(ids[0]).remove(); //info
    document.getElementById(ids[0]+'_info').remove(); //_summary
    firable=document.getElementsByClassName('firable');
    hide(street);
    showOffice();
}

function addEmployee(dep,employee) {
    for(var i=0;i<structure.length;i++) {
        if(structure[i].id==dep) {
            structure[i].employees.push(employee);
            break;
        }
    }
}

function getStaff() {
    structureFromAspirants();
    for(var i=0; i<structure.length; i++) {
        var employees=structure[i].employees;
        var depId=structure[i].id;
        addStaffDiv(office,depId,'',['width:100%'],'',false);
        addStaffDiv(document.getElementById(depId),depId+'_0','<b>'+structure[i].name+'</b>',[],'summary',false);
        addButton(document.getElementById(depId),'hire',' + ',depId+'_add',true);
        for(var j=0; j<employees.length; j++) {
            var empId=depId+'_'+employees[j].id;
            formPersonDivs(document.getElementById(depId),empId,employees[j],'firable');
        }
    }
}

function getAspirants() {
    for(var i=0;i<aspirants.length;i++) {
        formPersonDivs(street,aspirants[i].id,aspirants[i],'hirable');
    }
}

function formPersonDivs(el,id,person,purpose) {
    addStaffDiv(
        el,
        id+'_info',
        person.prof+' <br> '+person.name+' <br> '+person.salary+' $',
        ['display:none'],
        purpose+' '+id,
        false
    );
    addStaffDiv(
        el,
        id,
        person.name,
        ['display:inline-block'],
        'summary '+id,
        false
    );
}

function addStaffDiv(el,id,text,styles,classes,for_button) {
    var div = document.createElement('div');
    div.setAttribute('id',id);
    for(var k=0; k<styles.length; k++) {
        div.setAttribute('style',styles[k]);
    }
    if(classes!='') {
        div.setAttribute('class',classes);
    }
    el.appendChild(div);
    
    document.getElementById(id).innerHTML = text;
    if(for_button) {
        return document.getElementById(id);
    }
    return true;
}

function addButton(el,cl,val,id,in_div) {
    if(in_div) {
        new_el=addStaffDiv(el,id+'_div','',['width:100%'],[],true);
    }
    var inp=document.createElement('input');
    inp.setAttribute('type','button');
    inp.setAttribute('class',cl);
    inp.setAttribute('value',val);
    inp.setAttribute('id',id);
    new_el.appendChild(inp);
}

function structureFromAspirants() {
    var employees=[];
    for(var i=0;i<structure.length;i++) {
        employees=[];
        for(j=0;j<structure[i].plan_quant;j++) {
            var index=getRandomInt(0,aspirants.length-1);
            employees.push(aspirants[index]);
            aspirants.splice(index,1);
        }
        structure[i].employees=employees;
    }
}

function showOffice() {
    show(management);
    show(office);
    summaryOnClick();
}

function hideOffice() {
    hide(management);
    hide(office);
}

function summaryOnClick() {
    var summary=document.getElementsByClassName('summary');
    for(var i=0;i<summary.length;i++) {
        summary[i].onclick=function() {
            var summary_id=this.id;
            var this_employee_divs=document.getElementsByClassName(summary_id);
            for(var j=0;j<this_employee_divs.length;j++) {
                if(this_employee_divs[j].id!==summary_id) {
                    this_employee_divs[j].setAttribute('style','display:block');
                    hide(document.getElementById(summary_id));
                }
            }
        }
    }
}

function getRandomInt(min, max) {
    return Math.abs(Math.floor(Math.random() * (max - min))) + min;
}

function show(el) {
    el.style.display = '';
}

function hide(el) {
    el.style.display = 'none';
}

function toggle(el) {
    el.style.display = (el.style.display == 'none') ? '' : 'none'
}