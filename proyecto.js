function ejecutarProblema() {
    // Objeto para almacenar datos del usuario
    const userData = {
        carbonFootprint: 0, // Huella de carbono estimada
        responses: {}, // Respuestas del usuario
        recommendations: [] // Consejos generados
    };

    let step = 0; // Control de pasos
    const steps = []; // Preguntas dinámicas

    // Mensaje inicial en consola
    function welcomeMessage() {
        console.clear();
        console.log(`
        =====================================
                     VANKVERSITY
        =====================================
        Bienvenido a la aplicación de concienciación sobre el cambio climático.

        Aprende sobre el cambio climático, calcula tu huella de carbono y obtén
        consejos prácticos para reducir tu impacto ambiental.

        Sigue las instrucciones y responde desde la consola.
        =====================================
        `);
    }

    // Menú interactivo
    function menu() {
        console.log(`
        =====================================
            Menú Principal
        =====================================
        Selecciona una opción escribiendo el número correspondiente:
        1: Introducción al Cambio Climático
        2: Huella de Carbono Personal
        3: Consejos Prácticos para Reducir tu Impacto
        =====================================
        Usa: input('1'), input('2'), o input('3') para seleccionar.
        `);
    }

    // Módulo 1: Introducción al Cambio Climático
    function moduleIntroduction() {
        console.log(`
        =====================================
              INTRODUCCIÓN AL CAMBIO CLIMÁTICO
        =====================================
        El cambio climático es causado principalmente por:
        - La quema de combustibles fósiles (75% de las emisiones de gases de efecto invernadero).
        - La deforestación y la pérdida de biodiversidad.

        Consecuencias:
        - Calentamiento global.
        - Derretimiento de los casquetes polares.
        - Fenómenos climáticos extremos.

        Escribe: input('menu') para volver al menú principal.
        `);
    }

    // Módulo 2: Calculadora de Huella de Carbono Personal
    function moduleCarbonCalculator() {
        console.log(`
        =====================================
            CALCULADORA DE HUELLA DE CARBONO
        =====================================
        Responde las siguientes preguntas escribiendo tus respuestas en consola.
        `);

        step = 0;
        steps.length = 0; // Limpiar pasos previos
        steps.push(
            "¿Con qué frecuencia usas transporte público? (diario/semanal/nunca):",
            "¿Consumes carne roja más de 3 veces por semana? (sí/no):",
            "¿Apagas las luces y desconectas aparatos cuando no los usas? (sí/no):",
            "¿Cuántos kilómetros recorres semanalmente en transporte privado? (0/1-50/más de 50):",
            "¿Compras productos con mucho empaque plástico? (sí/no):"
        );
        next(); // Comenzar el flujo de preguntas
    }

    // Control de preguntas
    function next(answer) {
        if (answer !== undefined) {
            const keys = ["transport", "meat", "electricity", "privateTransport", "plastics"];
            userData.responses[keys[step - 1]] = answer.toLowerCase();
        }

        if (step < steps.length) {
            console.log(steps[step]);
            console.log(`Usa: input('tu respuesta')`);
            step++;
        } else {
            calculateCarbonFootprint();
        }
    }

    // Cálculo de huella de carbono
    function calculateCarbonFootprint() {
        let carbonFootprint = 0;

        // Transporte público
        if (userData.responses.transport === 'nunca') carbonFootprint += 3;
        else if (userData.responses.transport === 'semanal') carbonFootprint += 2;
        else if (userData.responses.transport === 'diario') carbonFootprint += 1;

        // Consumo de carne roja
        if (userData.responses.meat === 'sí') carbonFootprint += 2;

        // Uso de electricidad
        if (userData.responses.electricity === 'no') carbonFootprint += 1;

        // Transporte privado
        if (userData.responses.privateTransport === '1-50') carbonFootprint += 2;
        else if (userData.responses.privateTransport === 'más de 50') carbonFootprint += 4;

        // Uso de plásticos
        if (userData.responses.plastics === 'sí') carbonFootprint += 1;

        userData.carbonFootprint = carbonFootprint;

        console.log(`
        =====================================
            RESULTADOS DE TU HUELLA DE CARBONO
        =====================================
        Tu huella de carbono estimada es de ${carbonFootprint} toneladas de CO₂ al año.
        La media global es de 4 toneladas.
        Estos son los siguientes consejos para ti:
        `);
        modulePracticalTips()
    }

    // Módulo 3: Consejos Prácticos para Reducir tu Impacto
    function modulePracticalTips() {
        console.log(`
        =====================================
            CONSEJOS PRÁCTICOS
        =====================================
        Basado en tus respuestas, aquí hay algunas recomendaciones:
        `);

        if (userData.responses.meat === 'sí') {
            console.log("- Reducir el consumo de carne roja a una vez por semana puede disminuir tu huella de carbono en 0.8 toneladas al año.");
        }
        if (userData.responses.transport === 'nunca') {
            console.log("- Optar por transporte público o bicicleta puede reducir tu impacto ambiental significativamente.");
        }
        if (userData.responses.electricity === 'no') {
            console.log("- Apagar las luces y desconectar aparatos puede reducir tu consumo eléctrico.");
        }
        if (userData.responses.privateTransport === '1-50' || 'más de 50') {
            console.log("- Reducir el uso de transporte privado disminuye tus emisiones de CO₂.");
        }
        if (userData.responses.plastics === 'sí') {
            console.log("- Evitar productos con empaque plástico disminuye la contaminación.");
        }

        console.log("Escribe: input('menu') para volver al menú principal.");
    }

    // Interpretador de comandos
    function input(command) {
        switch (command.toLowerCase()) {
            case "menu":
                menu();
                break;
            case "1":
                moduleIntroduction();
                break;
            case "2":
                moduleCarbonCalculator();
                break;
            case "3":
                modulePracticalTips();
                break;
            default:
                if (steps.length > 0) {
                    next(command);
                } else {
                    console.log("Entrada no válida. Usa: input('menu') para ver las opciones.");
                }
        }
    }

    // Iniciar la aplicación automáticamente
    welcomeMessage();
    menu();
    window.input = input;
}
