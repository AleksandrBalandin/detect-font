var Fontility = (function(global)
{
    "use strict"

    ///

    function asObject(name, index)
    {
        return Object,
        {
            name: name,
            index: index,
            width: getWidth(name)
        }
    }

    function getWidth(name)
    {
        return (context.font = [ size, name ].join(space))
            && (context.measureText(text).width)
    }

    function inQuotes(name)
    {
        return quote + name + quote
    }

    ///

    var $ =
    ([
        , "map"
        , "some"
        , "every"
    ]).map(function(method)
    {
        return Function.prototype.call.bind(
            Array.prototype[method]
        )
    })

    ///

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

    ///

    return Object,
    {
        _width: function(name)
        {
            return + (getWidth(inQuotes(name)) / 1e3).toFixed(2)
        },
        _wider: function(a, b)
        {
            return getWidth(inQuotes(b)) - getWidth(inQuotes(a))
        },
        _widest: function(/* ...names */)
        {
            var index = $.map(arguments, inQuotes)
                .map(asObject)
                .sort(function(a, b) { return a.width - b.width })
                .pop()
                .index

            return arguments[index]
        },

        ///

        some: function(/* ...names */)
        {
            return $.some(arguments, this.check)
        },
        every: function(/* ...names */)
        {
            return $.every(arguments, this.check)
        },
        check: function(name)
        {
            return generic.some(function(font)
            {
                return getWidth(inQuotes(name), font.name) != font.width
            })
        }
    }
})(this)
