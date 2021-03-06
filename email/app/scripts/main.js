console.log('\'Allo \'Allo!');

var rss_items = [];

get_item = function(item_index,rss_item_ids) {
    $.get('http://the.open-budget.org.il/api/sysprop/rss_items['+rss_item_ids[item_index]+']', function (data) {
        var item = data.value;
        rss_items.push(item);
        item_index += 1;
        if (item_index < rss_item_ids.length) {
            get_item(item_index,rss_item_ids);
            $("#percent").html(Math.floor(100*item_index/rss_item_ids.length)+"%");
        } else {
            do_render(rss_items);
        }
    }, "jsonp");
}

do_render = function(items) {
    $.get('http://the.open-budget.org.il/api/sysprop/rss_title', function (data) {
        var feed_title = data.value;
        console.log("got 1");
        $.get('templates/email_item_template.jinja.html', function(data) {
            var item_template = data;
            console.log("got 2");
            var rendered_items = [];
            for ( var _item in rss_items ) {
                var item = rss_items[_item];
                item['baseurl'] = '';
                rendered_item = jinja.render(item_template,item);
                rendered_items.push({
                    description: rendered_item,
                    title: item.title,
                    link: "http://the.open-budget.org.il/stg/#transfer/"+item['group_id']+"/"+item['group'][0][0],
                    index: parseInt(_item)+1
                });
            }
            $.get("templates/email_template.mustache.html", function(data) {
                var feed_template = data;
                var template_data = {
                    entries: rendered_items,
                    feed: {
                        'title': 'על שולחן ועדת הכספים',
                        'subtitle': feed_title
                    }
                };
                var full = Mustache.render(feed_template,template_data);
                document.write(full);
            },"html");
        }, "html");
    }, "jsonp");

}

$( function() {
    $.get('http://the.open-budget.org.il/api/sysprop/rss_items', function (data) {
        var rss_item_ids = data.value;
        console.log("got "+rss_item_ids);
        get_item(0,rss_item_ids);
    }, "jsonp");
});
