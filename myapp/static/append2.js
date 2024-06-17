function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


$(function() {
propertiesList = [];

function addProperty() {

    let agregateState =$("#agregate_state").val()
    const T = $("#phase-transition-table").find('tr').map(function(){return $(this).find('td:eq(0)>input').val()}).get();
    const Cp = $("#phase-transition-table").find('tr').map(function(){return $(this).find('td:eq(1)>input').val()}).get();
    const HTH0 = $("#phase-transition-table").find('tr').map(function(){return $(this).find('td:eq(2)>input').val()}).get();
    const ST = $("#phase-transition-table").find('tr').map(function(){return $(this).find('td:eq(3)>input').val()}).get();
    const GT = $("#phase-transition-table").find('tr').map(function(){return $(this).find('td:eq(4)>input').val()}).get();

     {
        const property = {
            agregateState: $("#agregate_state").val(),
            numberPhase: $("#number_phase").val(),

            T: T,
            Cp: Cp,
            HTH0: HTH0,
            ST: ST,
            GT: GT
        };

        propertiesList.push(property);

        const option = document.createElement('option');
        option.value = agregateState;
        option.textContent = agregateState;
        document.getElementById('properties').add(option);




        $("#phase-transition-table").find('tr').map(function(){return $(this).find('td:eq(0)>input').val("")});
        $("#phase-transition-table").find('tr').map(function(){return $(this).find('td:eq(1)>input').val("")});
        $("#phase-transition-table").find('tr').map(function(){return $(this).find('td:eq(2)>input').val("")});
        $("#phase-transition-table").find('tr').map(function(){return $(this).find('td:eq(3)>input').val("")});
        $("#phase-transition-table").find('tr').map(function(){return $(this).find('td:eq(4)>input').val("")});
    }
}
document.getElementById("add_phase_btn").addEventListener('click',addProperty);
function fillPropertyFields( agregateState, numberPhase, degreeOfCrystallinity,
enthalpyOfCombustion, enthalpyOfCombustionErr, enthalpyOfFormation,
 enthalpyOfFormationErr, entropyOfFormation, entropyOfFormationErr,
  gibbsEnergyOfFormation, gibbsEnergyOfFormationErr, lnK,
   residualEntropyAt0K, residualEntropyAt0KErr, configurationalEntropy,
    configurationalEntropyErr, differenceOfZero, differenceOfZeroErr, T, Cp, HTH0, ST, GT) {
    console.log(agregateState)
    for (let i = 0; i < T.length; i++)
    removeRow();
    for(let i = 0; i < T.length; i++)
    addRow();
    const agregateStateInput = document.getElementById('agregate_state');
    const numberPhaseInput = document.getElementById('number_phase');

    const TInput = document.getElementById('T');
    const CpInput = document.getElementById('Cp');
    const HTH0Input = document.getElementById('HT_H0');
    const STInput = document.getElementById('ST');
    const GTInput = document.getElementById('GT');


    agregateStateInput.value = agregateState;
    numberPhaseInput.value = numberPhase;

    TInput.value = T;
    CpInput.value = Cp;
    HTH0Input.value = HTH0;
    STInput.value = ST;
    GTInput.value = GT;
}

const propertiesListbox = document.getElementById('properties');
propertiesListbox.addEventListener('click', () => {
    selectedIndex = propertiesListbox.selectedIndex;
    if (selectedIndex !== -1) {
        const selectedProperty = propertiesList[selectedIndex];
        fillPropertyFields(

            selectedProperty.agregateState,
            selectedProperty.numberPhase,

            selectedProperty.T,
            selectedProperty.Cp,
            selectedProperty.HTH0,
            selectedProperty.ST,
            selectedProperty.GT
        );
    }
});

// Глобальные переменные для хранения данных
phaseTransitionsList = [];
let selectedTransitionIndex = -1;

// Функция для добавления нового фазового перехода
function addPhaseTransition() {
  const sourcePhaseInput = document.getElementById('source_phase');
  const targetPhaseInput = document.getElementById('target_phase');
  const sourcePhaseNumberInput = document.getElementById('source_phase_number');
  const targetPhaseNumberInput = document.getElementById('target_phase_number');

  const enthalpyTransitionInput = document.getElementById('enthalpy_transition');


  const phaseTransition = {
    sourcePhase: sourcePhaseInput.value,
    targetPhase: targetPhaseInput.value,
    sourcePhaseNumber: sourcePhaseNumberInput.value,
    targetPhaseNumber: targetPhaseNumberInput.value,

    enthalpyTransition: parseFloat(enthalpyTransitionInput.value),


  };



  phaseTransitionsList.push(phaseTransition);

  // Добавление нового элемента в listbox
  const option = document.createElement('option');
  option.value = phaseTransitionsList.length - 1;
  option.textContent = `${phaseTransition.sourcePhase} -> ${phaseTransition.targetPhase}`;
  document.getElementById('phase-transitions').add(option);

  // Очистка полей ввода
  sourcePhaseInput.value = '';
  targetPhaseInput.value = '';
  sourcePhaseNumberInput.value = '';
  targetPhaseNumberInput.value = '';


  enthalpyTransitionInput.value = '';



  }



// Обработчик события выбора фазового перехода в listbox
const phaseTransitionsListbox = document.getElementById('phase-transitions');
phaseTransitionsListbox.addEventListener('click', () => {
  const selectedIndex = phaseTransitionsListbox.selectedIndex;
  if (selectedIndex !== -1) {
    const selectedTransition = phaseTransitionsList[selectedIndex];
    fillPhaseTransitionFields(
      selectedTransition.sourcePhase,
      selectedTransition.targetPhase,
      selectedTransition.sourcePhaseNumber,
      selectedTransition.targetPhaseNumber,
      selectedTransition.temperature,
      selectedTransition.temperatureErr,
      selectedTransition.enthalpyTransition,
      selectedTransition.enthalpyTransitionErr,
      selectedTransition.entropyTransition,
      selectedTransition.entropyTransitionErr,
      selectedTransition.jumpHeatCapacity,
      selectedTransition.startTemperature,
      selectedTransition.endTemperature
    );

  }
});
document.getElementById("add_transition_btn").addEventListener('click',addPhaseTransition);
function fillPhaseTransitionFields(
  sourcePhase,
  targetPhase,
  sourcePhaseNumber,
  targetPhaseNumber,
  temperature,
  temperatureErr,
  enthalpyTransition,
  enthalpyTransitionErr,
  entropyTransition,
  entropyTransitionErr,
  jumpHeatCapacity,
  startTemperature,
  endTemperature
) {
  // Заполнение полей формы данными выбранного перехода
  document.getElementById('source_phase').value = sourcePhase;
  document.getElementById('target_phase').value = targetPhase;
  document.getElementById('source_phase_number').value = sourcePhaseNumber;
  document.getElementById('target_phase_number').value = targetPhaseNumber;
  document.getElementById('temperature').value = temperature;
  document.getElementById('temperature_err').value = temperatureErr;
  document.getElementById('enthalpy_transition').value = enthalpyTransition;
  document.getElementById('enthalpy_transition_err').value = enthalpyTransitionErr;
  document.getElementById('entropy_transition').value = entropyTransition;
  document.getElementById('entropy_transition_err').value = entropyTransitionErr;
  document.getElementById('jump_heat_capacity').value = jumpHeatCapacity;
  document.getElementById('start_temperature').value = startTemperature;
  document.getElementById('end_temperature').value = endTemperature;
}



const table = document.getElementById('phase-transition-table');
    const tbody = table.getElementsByTagName('tbody')[0];
    const addRowButton = document.getElementById('add-row');

    function addRow() {
      const row = document.createElement('tr');

      for (let i = 0; i < 5; i++) {
        const cell = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = '';
        cell.appendChild(input);
        row.appendChild(cell);
      }

      tbody.appendChild(row);
    }

    addRowButton.addEventListener('click', addRow);
    document.getElementById('remove-row').addEventListener('click', removeRow);

    function removeRow(){
    const lastChild = tbody.lastChild;

if (lastChild) {
  tbody.removeChild(lastChild);
}
    }

    tbody.addEventListener('click', (event) => {
      if (event.target.tagName === 'INPUT') {
        event.target.readOnly = false;
        event.target.focus();
      }
    });

    tbody.addEventListener('input', (event) => {
      if (event.target.tagName === 'INPUT') {
        event.target.readOnly = false;
        event.target.focus();
      }
    });

    document.addEventListener('paste', function(event) {
      if (event.target.tagName === 'INPUT' && event.target.closest('table') === table) {
        event.preventDefault();

        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('Text');

        const rows = pastedData.trim().split('\n');
        const startRow = 0;
        const startCol = 0;

        for (let i = 0; i < rows.length; i++) {
          const cells = rows[i].split('\t');

          // Добавляем новые строки, если необходимо
          while (tbody.rows.length <= startRow + i) {
            addRow();
          }

          for (let j = 0; j < cells.length; j++) {
            const cell = tbody.rows[startRow + i].cells[startCol + j].firstChild;
            cell.value = cells[j];
          }
        }
      }
    });
    addRow();



$("#result_table").hide()
async function sendData() {
    // Инициализация переменных для тестов
    const substanceClass = $('[list="substance_class"]').val(); // Замените на тестовое значение
    const substanceType = $("#substance_type").val(); // Замените на тестовое значение
    const name = $("#name").val(); // Замените на тестовое значение
    const formula = $("#formula").val(); // Замените на тестовое значение
    const source = $("#source").val(); // Замените на тестовое значение
    const cas = $("#cas").val(); // Замените на тестовое значение
     // Пример тестовых данных для literatureList


    const data = {
        substance_class: substanceClass,
        substance_type: substanceType,
        name: name,
        formula: formula,


        AggregateState: propertiesList,
        transactions_list: phaseTransitionsList,
    };
    console.log("Data to be sent:", JSON.stringify(data)); // Логирование данных
    response_data=null;
    try {
        const response = await fetch("/api/calc/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify(data),
        }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
    $("#result_table").show();
        console.log(data);
        $("#res").append("<h3>a="+data.a+"; b="+data.b+"; Ошибка MSE:"+ data.mse_err+"</h3>")
        var table=$("#result_table tbody")
        for(var i=0;i<data.t.length;i++)
        for( var j=0;j<data.t[i].length;j++){
        table.append('<tr><td>' + data.t[i][j] + '</td><td>' + data.cp[i][j] + '</td><td>' + data.h[i][j] + '</td><td>' + data.s[i][j] + '</td><td>' + data.g[i][j] + '</td></tr>');

        }

        // Теперь у тебя есть доступ к данным из JSON
    }).catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
;

//        if (response.ok) {
//
//            alert("Данные успешно отправлены");
//
//
//
//        } else {
//            const errorData = await response.json();
//            console.error("Ошибка при отправке данных:", errorData);
//            alert("Ошибка при отправке данных");
//        }
//        let res_json=response.json();
//        console.log(res_json);


    } catch (error) {
        console.error("Ошибка:", error);
        alert("Ошибка при отправке данных");
    }
}


document.getElementById('sendDataButton').addEventListener('click', sendData);


});

