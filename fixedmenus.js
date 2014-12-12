/*
 * Fixed Navigation Menus
 * Version: 0.1 Alfa
 * By: AliReza Tofighi
 * https://github.com/atofighi/fixedmenus
 */

(function($){

	var FixedMenus = function(el, options)
	{
		this.el = el;
		this.opts = options;
		this.make_offset = function(obj, type){
			if(obj.el == 'ELM') obj.el = this.el;
			var offset = $(obj.el).offset();
			if(obj.withit)
				offset.left += $(obj.el).outerWidth();
			if(obj.withit)
				offset.top += $(obj.el).outerHeight();
			return offset[type] + obj.offset[type];
		}
		this.scroll = function(e){
			this.el = $(this.el);

			var element = e.target;
			var top = $(element).scrollTop();
			var left = $(element).scrollLeft();
			var width = this.el.outerWidth();
			var height = this.el.outerHeight();
			var offset = this.el.offset();

			if(typeof this.opts.top == 'object') this.opts.top = this.make_offset(this.opts.top, 'top');
			if(typeof this.opts.left == 'object')	this.opts.left = this.make_offset(this.opts.left, 'left');
			if(typeof this.opts.bottom == 'object')	this.opts.bottom = this.make_offset(this.opts.bottom, 'top');
			if(typeof this.opts.right == 'object')	this.opts.right = this.make_offset(this.opts.right, 'left');

			if((this.opts.top == -1 || top >= this.opts.top) && (this.opts.bottom == -1 || top <= this.opts.bottom) && (this.opts.left == -1 || left >= this.opts.left) && (this.opts.right == -1 || left <= this.opts.right))
			{
				this.el.addClass(this.opts.className);
				this.opts.onaddClass();
			}
			else
			{
				this.el.removeClass(this.opts.className);
				this.opts.onremoveClass();
			}
		}
	};

	$.fn.fixedMenu = function(opts)
	{
		options = $.extend({
			top: {el:'ELM',withit:false,offset:{top:0,left:0}},
			bottom: -1,
			left: -1,
			right: -1,
			className: 'fixedMenu',
			parent: window,
			onaddClass: function(){},
			onremoveClass: function(){}
		}, opts);

		if(this.length == 1){
			var fm = new FixedMenus(this, options);
			$(options.parent).scroll($.proxy(fm.scroll, fm));
			$(options.parent).scroll();
			delete fm;
			return this;
		}
		this.each(function(){
			return $(this).fixedMenu(opts);
		});
	}
})(jQuery);