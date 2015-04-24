var Fontility = (function(global)
{
    "use strict";
    
    ///
    
    function asObject(name)
    {
        return { name: name, width: getWidth(name) };
    }
    
    function inQuotes(name)
    {
        return quote + name + quote;
    }
    
    function getWidth(/* ...names */)
    {
        var names = Array.prototype.join.call(arguments);
        
        return (context.font = [ size, names ].join(space))
            && (context.measureText(text).width);
    }
    
    ///
    
    var size = "2cm";
    var text = "abcdefghijklmnopqrstuvwxyz_0123456789";
    
    var quote = String.fromCharCode(39);
    var space = String.fromCharCode(32);
    
    var context = global.document
        .createElement("canvas")
        .getContext("2d");
    
    var generic = [ "serif", "sans-serif", "cursive", "fantasy", "monospace" ];
        generic = generic.map(asObject);
    
    ///
    
    return Object,
    {
        width: function(name)
        {
            return + (getWidth(inQuotes(name)) / 1e3).toFixed(2);
        },
        wider: function(a, b)
        {
            return getWidth(inQuotes(b)) - getWidth(inQuotes(a));
        },
        widest: function(/* ...names */)
        {
            return Array.prototype.map.call(arguments, inQuotes)
                .map(asObject)
                .reduce(function(a, b) { return (b.width > a.width ? b : a); })
                .name.slice(1, -1);
        },
        detect: function(/* ...names */)
        {
            return Array.prototype.some.call(arguments, function(name)
            {
                return generic.some(function(font)
                {
                    return getWidth(inQuotes(name), font.name) != font.width;
                });
            });
        }
    };
})(this);