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
    .map(_asObject)

    function _getWidth(/* ...names */)
    {
        var names = _.join(arguments)

        return (_context.font = [ _size, names ].join(" "))
            && (_context.measureText(_text).width)
    }

    function _asObject(name, index)
    {
        var font = { name: name, width: _getWidth(name) }
            font._index = index

        return font
    }

    function _inQuotes(name)
    {
        return "\"" + name + "\""
    }

    function checkFont(name)
    {
        return _generic.some(function(font)
        {
            return font.width != _getWidth(_inQuotes(name), font.name)
        })
    }

    module.exports =
    {
        width: function(name)
        {
            return checkFont(name)
                ? +(_getWidth(_inQuotes(name)) / 1e3).toFixed(2)
                : NaN
        },
        wider: function(a, b)
        {
            return _getWidth(_inQuotes(b)) - _getWidth(_inQuotes(a))
        },
        widest: function(/* ...names */)
        {
            var widest = _.map(arguments, _inQuotes)
                .map(_asObject)
                .sort(function(a, b) { return b.width - a.width })
                .shift()

            return arguments[widest._index]
        },
        any: function(/* ...names */)
        {
            return _.some(arguments, checkFont)
        },
        all: function(/* ...names */)
        {
            return _.every(arguments, checkFont)
        },
        check: checkFont
    }
})()