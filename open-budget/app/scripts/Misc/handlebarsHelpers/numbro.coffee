define ['handlebarsRuntime', 'vendor/numbro', 'scripts/Misc/numbro-he-IL'], (handlebarsRuntime, numbroLib) ->
  handlebarsRuntime.registerHelper "numbro", (numberToFormat, params) ->

    numbro.language "he-IL"

    number = numbroLib numberToFormat

    number[params.hash.operation] params.hash.operationFactor if params.hash.operation?

    if params.hash.isCurrency
      number.formatCurrency params.hash.format
    else
      number.format params.hash.format
