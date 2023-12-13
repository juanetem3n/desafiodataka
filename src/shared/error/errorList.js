module.exports = {
    SEARCH_EXPIRED: {
        httpCode: 500,
        code: "SEARCH_EXPIRED",
        description: "Los precios mostrados ya no están disponibles o el token ha expirado. Realizar de nuevo la consultas",
    },
    FARE_EXPIRED: {
        httpCode: 500,
        code: "FARE_EXPIRED",
        description: "La tarifa ya ha expirado",
    },
    NO_AVAIL_FOUND: {
        httpCode: 500,
        code: "NO_AVAIL_FOUND",
        description: "No se ha encontrado disponibilidad o vuelo / hotel completo",
    },
    CANCELED_ORDER: {
        httpCode: 500,
        code: "CANCELED_ORDER",
        description: "La operación no ha podido realizarse porque la orden se encuentra cancelada",
    },
    ORDER_STATE_INVALID: {
        httpCode: 500,
        code: "ORDER_STATE_INVALID",
        description: "Estado de la orden inválida para realizar el pago o cancelación",
    },
    TRAVEL_IS_EMITTED: {
        httpCode: 500,
        code: "TRAVEL_IS_EMITTED",
        description: "El transporte a emitir se encuentra emitido.",
    },
    NO_AVAILABILITY: {
        httpCode: 500,
        code: "NO_AVAILABILITY",
        description: "El producto no tiene disponibilidad.",
    },
    DETAILS_NOT_FOUND: {
        httpCode: 500,
        code: "DETAILS_NOT_FOUND",
        description: "No se han encontrado la información del detalle de la búsqueda",
    },
    UNKNOWN_ERROR: {
        httpCode: 500,
        code: "UNKNOWN_ERROR",
        description:
            "Se ha producido un error en el sistema. Inténtalo de nuevo y si la incidencia persiste ponte en contacto con nosotros.",
    },
    BAGGAGE_ANCILLARY_NOT_FOUND: {
        httpCode: 500,
        code: "BAGGAGE_ANCILLARY_NOT_FOUND",
        description: "No se han encontrado la selección de maleta elegida. DEPRECADO",
    },
    SEATMAP_ANCILLARY_NOT_FOUND: {
        httpCode: 500,
        code: "SEATMAP_ANCILLARY_NOT_FOUND",
        description: "No se han encontrado la selección de asiento elegida. DEPRECADO",
    },
    NO_AVAILABILITY_SERVICE: {
        httpCode: 500,
        code: "NO_AVAILABILITY_SERVICE",
        description: "No hay disponibilidad del servicio solicitado.",
    },
    INSUFFICIENT_TRAVELER_DATA: {
        httpCode: 500,
        code: "INSUFFICIENT_TRAVELER_DATA",
        description: "Faltan datos de viajeros o están incompletos.",
    },
    INVALID_TRAVELER_DATA: {
        httpCode: 500,
        code: "INVALID_TRAVELER_DATA",
        description: "Fallo de validación de datos. Por favor, revisalos por si hay un error.",
    },
    ORDER_ALREADY_EXISTS: {
        httpCode: 500,
        code: "ORDER_ALREADY_EXISTS",
        description: "La orden ya existe.",
    },
    ERROR_IN_CONFIRM_ORDER: {
        httpCode: 500,
        code: "ERROR_IN_PAYMENT",
        description: "Error en la confirmación de la compra.",
    },
    NO_CANCELLABLE: {
        httpCode: 500,
        code: "NO_CANCELLABLE",
        description: "No cancelable.",
    },
    USER_NOT_FOUND: {
        httpCode: 401,
        code: "USER_NOT_FOUND",
        description: "The user does not exist",
    },
    PROVIDER_NOT_FOUND: {
        httpCode: 401,
        code: "PROVIDER_NOT_FOUND",
        description: "The provider does not exist",
    },
    NOT_VALID_PASSWORD: {
        httpCode: 401,
        code: "NOT_VALID_PASSWORD",
        description: "La contraseña no es válida para el usuario",
    },
    MARKETPLACE_AUTH_ERROR: {
        code: "MARKETPLACE_AUTH_ERROR",
        description: "invalid session uuid",
        api_code: 401,
    },
    USER_ALREADY_EXISTS: {
        httpCode: 401,
        code: "USER_ALREADY_EXISTS",
        description: "This username is already in use",
    },

    DB_SAVE_ERROR: {
        code: "DB_SAVE_ERROR",
        description: "error saving in the database",
        api_code: 500,
    },

    //Error que nos obliga a lanzar los procesos de disponibilidad-hold-confirm (Respetando ese orden).
    //Errores que NO cumplen esta condición: NO_AVAILABILITY, NO_AVAIL_FOUND y AVAIL_OUT
    CART_MUST_RETRY: {
        httpCode: 500,
        code: "CART_MUST_RETRY",
        description:
            "Algún producto del carrito contiene un error que no permite continuar. Por favor, compruebe la disponibilidad de nuevo",
    },
    PROVIDER_NOT_VALID_ORDER: {
        httpCode: 500,
        code: "PROVIDER_NOT_VALID_ORDER",
        description: "El proveedor indica que existe un problema con la compra: PNR no valido, no se tienen datos de la reserva..",
    },
    PROVIDER_ERROR_RATES: {
        httpCode: 500,
        code: "PROVIDER_ERROR_RATES",
        description: "El proveedor no devuelve un listado correcto de tarifas",
    },
    NO_CHANGES: {
        httpCode: 500,
        code: "NO_CHANGES",
        description: "Sin cambios.",
    },
    PRODUCT_CONDITIONS_CHANGED: {
        httpCode: 500,
        code: "PRODUCT_CONDITIONS_CHANGED",
        description: "Las condiciones del producto han cambiado: precio, reglas..",
    },
    INVALID_CURRENCY: {
        httpCode: 500,
        code: "INVALID_CURRENCY",
        description: "Moneda inválida",
    },
    ERROR_NOT_PROCESSED: {
        httpCode: 500,
        code: "ERROR_NOT_PROCESSED",
        description: "Error no procesado",
    },
    ID_DOCUMENT_NOT_VALID: {
        httpCode: 500,
        code: "ID_DOCUMENT_NOT_VALID",
        description: "Documento de identificación no válido",
    },
    PROVIDER_ERROR: {
        httpCode: 500,
        code: "PROVIDER_ERROR",
        description: "Se ha producido un error en la conexión con el proveedor",
    },
    ANCILLARY_ERROR: {
        httpCode: 500,
        code: "ANCILLARY_ERROR",
        description: "No existe disponibilidad de alguno de los servicios contratados",
    },
    BOOKING_INCORRECT_TIME: {
        httpCode: 500,
        code: "BOOKING_INCORRECT_TIME",
        description: "Hora no valida, no se puede realizar la reserva.",
    },
    INCORRECT_PAYLOAD_REQUEST: {
        httpCode: 500,
        code: "INCORRECT_PAYLOAD_REQUEST",
        description: "La petición realizada al proveedor está mal formada o es errónea",
    },
    NO_PRODUCTS_ON_CART: {
        httpCode: 500,
        code: "NO_PRODUCTS_ON_CART",
        description: "No se han encontrado productos en el carrito",
    },
    CREDIT_CARD_ERROR: {
        httpCode: 500,
        code: "CREDIT_CARD_ERROR",
        description: "Se ha producido un error con la tarjeta de crédito: no valida, tipo no identificado..",
    },
    NOT_OLD_VALID_PASSWORD: {
        httpCode: 500,
        code: "NOT_OLD_VALID_PASSWORD",
        description: "La contraseña antigua no es correcta",
    },
    TOKEN_EXPIRED: {
        httpCode: 500,
        code: "TOKEN_EXPIRED",
        description: "El token ha expirado",
    },
    TOKEN_SHOP_EXPIRED: {
        httpCode: 500,
        code: "TOKEN_SHOP_EXPIRED",
        description: "El token de la tienda o zona ha expirado",
    },
    BUDGET_NUMBER_LIMIT: {
        httpCode: 500,
        code: "BUDGET_NUMBER_LIMIT",
        description: "Se ha superado el numero total de presupuestos permitidos",
    },
    PROJECT_NUMBER_LIMIT: {
        httpCode: 500,
        code: "PROJECT_NUMBER_LIMIT",
        description: "Se ha superado el numero total de proyectos permitidos",
    },
    TRIP_NUMBER_LIMIT: {
        httpCode: 500,
        code: "TRIP_NUMBER_LIMIT",
        description: "Se ha superado el numero total de viajes permitidos",
    },
    FILTER_PARAMS_ERROR: {
        httpCode: 500,
        code: "FILTER_PARAMS_ERROR",
        description: "Los parámetros de búsqueda no son correctos o están incompletos",
    },
    TAG_NOT_FOUND: {
        httpCode: 500,
        code: "TAG_NOT_FOUND",
        description: "No existe un tag con el id indicado o no se encuentra en la base de datos",
    },
    TOKEN_NOT_FOUND: {
        httpCode: 500,
        code: "TOKEN_NOT_FOUND",
        description: "There is no token with the especified paramteres or it cant be found in the database",
    },
    ORDER_ALREADY_CONFIRMED: {
        httpCode: 500,
        code: "ORDER_ALREADY_CONFIRMED",
        description: "Ya se ha confirmado la reserva",
    },
    EXCEEDED_MAXIMUM_NUMBER_PRODUCTS_TO_BUY: {
        httpCode: 500,
        code: "EXCEEDED_MAXIMUM_NUMBER_PRODUCTS_TO_BUY",
        description: "Se ha excedido el máximo número de productos que se pueden comprar simultáneamente",
    },
    PRODUCT_NOT_DELETEABLE: {
        httpCode: 417,
        code: "PRODUCT_NOT_DELETEABLE",
        description: "The status of one of the products makes it impossible to delete",
    },
    SELF_AND_SHOP_OPPORTUNITIES: {
        httpCode: 500,
        code: "SELF_AND_SHOP_OPPORTUNITIES",
        description: "Las variables self y shop no pueden ambas ser verdaderas a la vez",
    },
    NOT_ADMIN_TASK_AND_NO_OPPORTUNITY_PHASE: {
        httpCode: 500,
        code: "NOT_ADMIN_TASK_AND_NO_OPPORTUNITY_PHASE",
        description: "la tarea no es administrativa y no se ha adjuntado la fase de oportunidad",
    },
    CALENDAR_EVENT_WITHOUT_START_DATE: {
        httpCode: 500,
        code: "CALENDAR_EVENT_WITHOUT_START_DATE",
        description: "evento del calendario sin fecha de inicio",
    },
    CALENDAR_EVENT_WITHOUT_END_DATE: {
        httpCode: 500,
        code: "CALENDAR_EVENT_WITHOUT_END_DATE",
        description: "evento del calendario sin fecha de fin",
    },
    CALENDAR_API_ERROR: {
        httpCode: 500,
        code: "CALENDAR_API_ERROR",
        description: "la operacion sobre el calendario ha fallado",
    },
    CART_LINKED_BUDGET: {
        httpCode: 500,
        code: "CART_LINKED_BUDGET",
        description: "El uuid del presupuesto no coincide con el asociado con el carrito",
    },
    BUDGET_NOT_FOUND: {
        httpCode: 500,
        code: "BUDGET_NOT_FOUND",
        description: "No se ha encontrado ningún presuesto con el uuid aportado",
    },
    INSUFFICIENT_FREE_BALANCE_TO_BLOCK: {
        httpCode: 418,
        code: "INSUFFICIENT_FREE_BALANCE_TO_BLOCK",
        description: "The user's free balance is not enough to block the desired amount",
    },
    INSUFFICIENT_FREE_REIMBURSABLE_BALANCE_TO_REFUND: {
        httpCode: 418,
        code: "INSUFFICIENT_FREE_REIMBURSABLE_BALANCE_TO_REFUND",
        description: "The user's free reimbursable balance is not enough to refund the desired amount",
    },
    INSUFFICIENT_BALANCE: {
        httpCode: 418,
        code: "INSUFFICIENT_BALANCE",
        description: "The user's balance is not enough to pay the desired amount",
    },
    UNSSUPORTED_OPERATION_WITHOUT_SUPERVISION: {
        httpCode: 401,
        code: "UNSSUPORTED_OPE$RATION_WITHOUT_SUPERVISION",
        description: "This process is not allowed without supervision",
    },
    UNKNOWN_CONFIRMATION_TOKEN: {
        httpCode: 500,
        code: "UNKNOWN_CONFIRMATION_TOKEN",
        description: "Unknown confirmation token",
    },
    CONFIRMATION_TOKEN_TIMED_OUT: {
        httpCode: 500,
        code: "CONFIRMATION_TOKEN_TIMED_OUT",
        description: "The confirmation token timed out",
    },
    USER_DIFFERENT_FROM_TOKEN: {
        httpCode: 500,
        code: "USER_DIFFERENT_FROM_TOKEN",
        description: "The user executing the process is different from the one that created the token",
    },
    INVALID_PARAMETERS: {
        httpCode: 400,
        code: "INVALID_PARAMETERS",
        description: "Invalid parameters, check the API documentation",
    },
    INVALID_DATA_TYPE: {
        httpCode: 400,
        code: "INVALID_PARAMETER_TYPE",
        description: "Invalid parameter type, check the API documentation",
    },
    USER_BLOCK_QUANTITY_EXCEEDED: {
        httpCode: 423,
        code: "USER_BLOCK_QUANTITY_EXCEEDED",
        description: "The user exceeded the maximum number of possible blocks at the same time",
    },

    CART_CHANGED_AFTER_BLOCK: {
        httpCode: 400,
        code: "CART_CHANGED_AFTER_BLOCK",
        description: "The cart products dont match with the budget ones. Save changes and try again",
    },
    SIGNAL_NOT_ENABLED: {
        httpCode: 400,
        code: "SIGNAL_NOT_ENABLED",
        description: "The budget cant be paid by signal",
    },
};
