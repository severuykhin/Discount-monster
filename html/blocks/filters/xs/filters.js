$(function () {

    if ($('[data-role="range"]').length <= 0) return;

    var RANGE_ELEMENTS = $('[data-role="range"]');
    var RANGES = {};
    
    function CreateRangeComponent(HTMLelement) {
    
        const mainElem = $(HTMLelement); 
        const minInput = mainElem.find('[data-role="range-min-value"]');
        const maxInput = mainElem.find('[data-role="range-max-value"]');
    
        this.element  = mainElem;
        this.minRange = parseInt(mainElem.attr('data-minrange'));
        this.maxRange = parseInt(mainElem.attr('data-maxrange'));
        this.minValue = parseInt(minInput.val());
        this.maxValue = parseInt(maxInput.val());
        this.line     = mainElem.find('[data-role="range-line"]');
        this.step     = mainElem.attr('data-step') ? parseInt(mainElem.attr('data-step')) : 1;
    
        this.minInput = minInput;
        this.maxInput = maxInput;
    
        this.lastMaxValue = 0;
    
        this.noUiSlider = null;
    }
    
    CreateRangeComponent.prototype.init = function () {
    
        this.noUiSlider = noUiSlider.create(this.line[0], {
                start    : [ this.minValue, this.maxValue ],
                connect  : true,
                step     : this.step,
                tooltips : window.innerWidth < 990,
                range    : {
                    'min': this.minRange,
                    'max': this.maxRange
                },
                format   : {
                    to: function ( value ) {
                      return Math.floor(value);
                    },
                    from: function ( value ) {
                      return value;
                    }
                  }
        });
    
        this.listenRangeEvents();
    }
    
    CreateRangeComponent.prototype.listenRangeEvents = function () {
    
        const self  = this;
     
        this.noUiSlider.on('update', function (values, handle) {
    
            const value = values[handle];
            
            if (handle === 1) {
                self.maxInput.val(value);
            } else {
                self.minInput.val(value);
            }
        });
    
        this.listenMinInputEvents();
        this.listenMaxInputEvents();
    
    }
    
    CreateRangeComponent.prototype.listenMinInputEvents = function () {
    
        const self = this;
    
        let lastMin = this.minValue;
    
        this.minInput.on('focusin', function () {
            lastMin = +this.value;
        });
    
        this.minInput.on('focusout', function () {
            let newMin = +this.value,
                currentMaxValue = self.maxInput.val();
            
            if (newMin >= currentMaxValue || newMin === 0) {
                this.value = lastMin;
            } else {
                self.noUiSlider.set([newMin, null]);
            }
        });
    
        this.minInput.on('input', function () {
            
            var newMinValue = +this.value;
            var currentMaxValue = +self.maxInput.val();
    
            if (newMinValue < currentMaxValue && newMinValue >= self.minRange) {
                lastMin = newMinValue;
                self.noUiSlider.set([newMinValue, null]);
            } 
            
        });
    }
    
    CreateRangeComponent.prototype.listenMaxInputEvents = function () {
    
        const self = this;
    
        let lastMax = this.maxValue;
    
        this.maxInput.on('focusin', function () {
            var minValue = +self.minInput.val(),
                newMax   = +this.value;
            if (minValue < newMax) {
                lastMax = newMax;
            }
        });
    
        this.maxInput.on('focusout', function () {
            var minValue = +self.minInput.val();
            if (minValue >= +this.value) {
                this.value = lastMax;
                self.noUiSlider.set([null, lastMax]);
            }
        });
    
        
        this.maxInput.on('input', function () {
            var newMaxValue = +this.value;
            var minValue = +self.minInput.val();
    
            if (newMaxValue > minValue) {
                lastMax = newMaxValue;
                self.noUiSlider.set([null, newMaxValue]);
            }
    
        });
    }
    
    
    RANGE_ELEMENTS.each(function (index, element) {
        var rangeInstance = new CreateRangeComponent(element);
        RANGES[`range-${index}`] = rangeInstance;
        console.log(rangeInstance);
        rangeInstance.init();
    });

});

// Sort
$(function () {
    $('[data-role="sort-select"]').niceSelect();
})