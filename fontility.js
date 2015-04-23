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
    
    var context = global.document
        .createElement("canvas")
        .getContext("2d");
    
    var size = "72px";
    var text = "abcdefghijklmnopqrstuvwxyz_0123456789";
    
    var quote = String.fromCharCode(39);
    var space = String.fromCharCode(32);
    
    var generic = [ "serif", "sans-serif", "cursive", "fantasy", "monospace" ];
        generic = generic.map(asObject);
    
    ///
    
    return Object,
    {
        wider: function(a, b)
        {
            a = getWidth(inQuotes(a));
            b = getWidth(inQuotes(b));
            
            return a - b;
        },
        widest: function(/* ...names */)
        {
            return Array.prototype.map.call(arguments, inQuotes)
                .map(asObject)
                .sort(function(a, b) { return b.width - a.width; })
                .shift().name
                .slice(1, -1);
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