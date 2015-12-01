define(function()
{
    "use strict"

    var _ =
    ([
        , "map"
        , "join"
        , "some"
        , "every"
    ]).reduce(function(utility, method)
    {
        utility[method] = Function.prototype.call.bind(
            Array.prototype[method]
        )

        return utility
    },  { })

    var size = "2cm"
    var text = "abcdefghijklmnopqrstuvwxyz_0123456789"

    var quote = String.fromCharCode(39)
    var space = String.fromCharCode(32)

    var context = document
        .createElement("canvas")
        .getContext("2d")

    var generic =
    ([
        , "serif"
        , "sans-serif"
        , "cursive"
        , "fantasy"
        , "monospace"
    ]).map(asObject)

    return Object,
    {
        /* font detection */

        some: function(/* ...names */)
        {
            return _.some(arguments, this.check)
        },
        every: function(/* ...names */)
        {
            return _.every(arguments, this.check)
        },
        check: function(name)
        {
            return generic.some(function(font)
            {
                return getWidth(inQuotes(name), font.name) != font.width
            })
        },

        /* character width comparison */

        width: function(name)
        {
            return + (getWidth(inQuotes(name)) / 1e3).toFixed(2)
        },
        wider: function(a, b)
        {
            return getWidth(inQuotes(b)) - getWidth(inQuotes(a))
        },
        widest: function(/* ...names */)
        {
            var widest = _.map(arguments, inQuotes)
                .map(asObject)
                .sort(function(a, b) { return b.width - a.width })
                .shift()

            return arguments[widest.index]
        }
    }

    function asObject(name, index)
    {
        return Object,
        {
            name: name,
            index: index,
            width: getWidth(name)
        }
    }

    function getWidth(/* ...names */)
    {
        var names = _.join(arguments)

        return (context.font = [ size, names ].join(space))
            && (context.measureText(text).width)
    }

    function inQuotes(name)
    {
        return quote + name + quote
    }
})
