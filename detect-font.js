(function()
{
    "use strict"

    var _ =
    [
        , "map"
        , "join"
        , "some"
        , "every"
    ]
    .reduce(function(utility, method)
    {
        utility[method] = Function.prototype.call.bind
        (
            Array.prototype[method]
        )

        return utility
    },  { })

    var _size = "2cm"
    var _text = "abcdefghijklmnopqrstuvwxyz_0123456789"

    var _context = document
        .createElement("canvas")
        .getContext("2d")

    var _generic =
    [
        , "serif"
        , "sans-serif"
        , "cursive"
        , "fantasy"
        , "monospace"
    ]
    .map(asObject)

    function getWidth(/* ...names */)
    {
        var names = _.join(arguments)

        return (_context.font = [ _size, names ].join(" "))
            && (_context.measureText(_text).width)
    }

    function asObject(name, index)
    {
        var font = { name: name, width: getWidth(name) }
            font._index = index

        return font
    }

    function inQuotes(name)
    {
        return "\"" + name + "\""
    }

    function checkFont(name)
    {
        return _generic.some(function(font)
        {
            return font.width != getWidth(inQuotes(name), font.name)
        })
    }

    module.exports =
    {
        any: function(/* ...names */)
        {
            return _.some(arguments, checkFont)
        },
        all: function(/* ...names */)
        {
            return _.every(arguments, checkFont)
        },
        check: checkFont,

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

            return arguments[widest._index]
        }
    }
})()