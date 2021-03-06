define ['backbone', 'scripts/modelsHelpers/SpendingLine'], (backbone, SpendingLine) ->

  class NewSpendings extends Backbone.Collection

      model: SpendingLine

      initialize: (models, options) ->
              @pageModel = options.pageModel
              @fetch(dataType: @pageModel.get('dataType'), reset: true)

      comparator: (model1, model2) ->
        if model1.get('flags').total_flags > model2.get('flags').total_flags
         -1
        else
          1

      url: ->
              "#{pageModel.get('baseURL')}/api/exemption/new/1?limit=300"

      setDaysToFetch: (days) ->
        @url = "#{pageModel.get('baseURL')}/api/exemption/new/" + days + "?limit=300"

  return NewSpendings
