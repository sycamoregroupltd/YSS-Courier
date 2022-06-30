import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiAuthHttpClient } from '../http/ApiAuthHttpClient';
import { Store } from '../store';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private apiService: ApiService,
        private http: ApiAuthHttpClient,
        private store: Store,
    ) {
    }

    getLinkedProducts(productId) {
        return this.http.get(env.apiPath + 'products/linked/' + productId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getLinkedCaseStudies(productId) {
        return this.http.get(env.apiPath + 'products/case-studies/' + productId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getProductDetails(slug) {
        return this.http.get(env.apiPath + 'products/public/' + slug, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getProductGroups() {
        return this.http.get(env.apiPath + 'product-groups', this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getProductGroup(slug) {
        return this.http.get(env.apiPath + 'product-groups/' + slug, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    productsByGroup(productGroup) {
        return this.http.get(env.apiPath + 'products/group/' + productGroup.id, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getProductRange(slug) {
        return this.http.get(env.apiPath + 'product-range/' + slug, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    productsByRange(productRange) {
        return this.http.get(env.apiPath + 'products/range/' + productRange.id, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    specialOffers() {
        return this.http.get(env.apiPath + 'products/offers/', this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    search(params) {
        const dataToSend = {
            params,
        };
        return this.http.post(env.apiPath + 'products/search', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                )
            );
    }

    getProductRanges() {
        return this.http.get(env.apiPath + 'product-range', this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getProductFinishes() {
        return this.http.get(env.apiPath + 'product-finish', this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }


    getProductTypes() {
        return this.http.get(env.apiPath + 'product-types/', this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getBespokeProductTypes() {
        return this.http.get(env.apiPath + 'product-types/bespoke', this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getRangesByProductType(productType) {
        return this.http.get(env.apiPath + 'product-range/product-type/' + productType, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getRangesByProductTypeOption(productType, optionId) {
        return this.http
            .get(env.apiPath + 'product-range/product-type/' + productType + '/option/' + optionId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }

    getProductVariableOptionsByGroup(id) {
        const dataToSend = {
            id,
        };
        return this.http.get(env.apiPath + 'product-variable-options/variable-group/' + id, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));

    }

    getProductVariableOptionsByGroupSupplier(id, supplierId) {
        return this.http.get(env.apiPath + 'product-variable-options/variable-group/' + id + '/' + supplierId, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));

    }

    loadBespokeConfiguration(productRange, productType, supplierId) {
        const dataToSend = {
            productRange,
            productType,
            supplierId,
        };

        return this.http.post(env.apiPath + 'product-range/product-type/configuration/public', dataToSend, this.apiService.getHttpOptions())
            .pipe(
                map((data: any) => {
                        return data;
                    },
                    catchError(this.apiService.handleError)
                ));
    }


    calcBespokeCost(product, costsSQM) {
        if (product.range) {
            if (product.purchaseUnit === 'P') {
                product.quantityMetres = (((product.width / 1000) * (product.length / 1000)) * product.quantity).toFixed(2);
            } else {
                product.quantityMetres = product.quantity;
            }

            if (product.sellUnit === 'PSM') {
                product.weightPerSellUnit = +product.range.baseWeight * (+product.height / 1000);
                // product.pricePerSellUnit = +(+product.range.baseCost * (+product.height / 1000)).toFixed(2);
                product.pricePerSellUnit = 0;
                // TODO if the thickness is greater than the top limit then convert to cubic pricing
                product.pricePerSellUnit = this.calculateSQMPricing(product, costsSQM);
                product.unitCostBreakdown.unitCost = product.pricePerSellUnit;

            }
            if (product.sellUnit === 'PLM') {
                const l = (+product.length / 1000);
                const w = (+product.width / 1000);
                const t = (+product.height / 1000);

                product.weightPerSellUnit = +((l * w * t) * +product.range.baseWeight).toFixed(2);
                product.pricePerSellUnit = +((l * w * t) * +product.range.baseCost).toFixed(2);
            }
            if (product.sellUnit === 'PCM') {
                const l = (+product.length / 1000);
                const w = (+product.width / 1000);
                const t = (+product.height / 1000);
                product.weightPerSellUnit = +((l * w * t) * +product.range.baseWeight).toFixed(2);
                product.pricePerSellUnit = +((l * w * t) * +product.range.baseCost).toFixed(2);
            }
            if (product.sellUnit === 'PT') {
                product.weightPerSellUnit = 1000;
                product.pricePerSellUnit = 0;
            }

            if (product.additionalRequirements) {
                let additionalCost = 0;
                if (product.additionalRequirements.costType === 'PLM') {
                    additionalCost = +(product.additionalRequirements.cost *
                        (+product.length / 1000) * (+product.width / 1000) * (+product.height / 1000)).toFixed(2);
                } else {
                    additionalCost = +(product.additionalRequirements.cost * (+product.length / 1000)).toFixed(2);
                }
                product.pricePerSellUnit = (+product.pricePerSellUnit + +additionalCost).toFixed(2);
            }

            const sidesArray = ['front', 'back', 'left', 'right'];

            if (product.riser) {
                let l = (+product.length / 1000);
                const w = (+product.riser.thickness / 1000);
                const t = (+product.riser.height / 1000);

                if (product.finishEdge && product.finishEdge.left.id) {
                    l = +l + (+product.width / 1000);
                }
                if (product.finishEdge && product.finishEdge.right.id) {
                    l = +l + (+product.width / 1000);
                }

                product.riser.weightPerSellUnit = +((l * w * t) * +product.range.baseWeight).toFixed(2);
                product.riser.pricePerSellUnit = +((l * w * t) * +product.range.baseCost).toFixed(2);
                product.riser.weight = product.riser.weightPerSellUnit * product.quantity;
                product.riser.price = product.riser.pricePerSellUnit * product.quantity;

                product.unitCostBreakdown.riserUnitCost = product.riser.pricePerSellUnit;
            }

            // weathering
            if (product.weathering) {
                // isolate the right cost range
                const costs = product.weathering.costs;
                let cost = 0;
                for (let ca = 0; ca < costs.length; ca++) {
                    if (product.height >= +costs[ca].rangeMin && product.height <= +costs[ca].rangeMax) {
                        cost = +costs[ca].cost;
                    }
                }
                const additionalCost = +(+cost * ((+product.width / 1000) * (+product.length / 1000))).toFixed(2);
                product.pricePerSellUnit = (+product.pricePerSellUnit + +additionalCost).toFixed(2);
                product.unitCostBreakdown.weathering = +additionalCost;
            }

            // finish top
            if (product.finishTop) {
                if (product.finishTop.costType) {
                    // isolate the right cost range
                    const costs = product.finishTop.costs;
                    let cost = 0;
                    for (let ca = 0; ca < costs.length; ca++) {
                        if (product.height >= +costs[ca].rangeMin && product.height <= +costs[ca].rangeMax) {
                            cost = +costs[ca].cost;
                        }
                    }
                    let additionalCost = 0;
                    if (product.finishTop.costType === 'PLM') {
                        additionalCost = +(+cost * (+product.length / 1000)).toFixed(2);
                        product.pricePerSellUnit = (+product.pricePerSellUnit + +additionalCost).toFixed(2);
                    } else {
                        additionalCost = +(+cost).toFixed(2);
                        product.pricePerSellUnit = (+product.pricePerSellUnit + +additionalCost).toFixed(2);
                    }
                    product.unitCostBreakdown.finishTop = +additionalCost;

                }
            }

            // finish bottom without side options
            if (product.finishBottom && product.finishBottom.id) {
                const costs = product.finishBottom.costs;
                let cost = 0;
                for (let ca = 0; ca < costs.length; ca++) {
                    if (product.height >= +costs[ca].rangeMin && product.height <= +costs[ca].rangeMax) {
                        cost = +costs[ca].cost;
                    }
                }

                let additionalCost = 0;
                if (product.finishBottom.costType === 'PLM') {
                    additionalCost = +(+cost * (+product.length / 1000)).toFixed(2);
                    additionalCost = +additionalCost + +(+cost * (+product.width / 1000)).toFixed(2);
                    product.pricePerSellUnit = (+product.pricePerSellUnit + +additionalCost).toFixed(2);
                } else {
                    additionalCost = +(+cost * +product.quantity).toFixed(2);
                    product.pricePerSellUnit = (+product.pricePerSellUnit + +additionalCost).toFixed(2);
                }
                product.unitCostBreakdown.finishBottom = +additionalCost;


                // if there is an end piece
                if (product.ends > 0) {
                    product.pricePerSellUnit = (+product.pricePerSellUnit + this.calcEndCost(+cost, +product.width, +product.ends)).toFixed(2);
                    product.unitCostBreakdown.end = this.calcEndCost(+cost, +product.width, +product.ends);
                }

            }

            // finish bottom with side options
            if (product.finishBottom && !product.finishBottom.id) {
                for (let i = 0; i < sidesArray.length; i++) {
                    if (product.finishBottom[sidesArray[i]] !== '') {

                        // isolate the right cost range
                        const costs = product.finishBottom[sidesArray[i]].costs;
                        let cost = 0;
                        for (let ca = 0; ca < costs.length; ca++) {
                            if (product.height >= +costs[ca].rangeMin && product.height <= +costs[ca].rangeMax) {
                                cost = +costs[ca].cost;
                                product.unitCostBreakdown.finishBottom = +costs[ca].cost;
                            }
                        }

                        let additionalCost = 0;
                        if (product.finishBottom[sidesArray[i]].costType === 'PLM') {
                            if (sidesArray[i] === 'front' || sidesArray[i] === 'back') {
                                additionalCost = +(+cost * (+product.length / 1000)).toFixed(2);
                            } else {
                                additionalCost = +(+cost * (+product.width / 1000)).toFixed(2);
                            }
                            product.pricePerSellUnit = (+product.pricePerSellUnit + +additionalCost).toFixed(2);
                        } else {
                            additionalCost = +(+cost * +product.quantity).toFixed(2);
                            product.pricePerSellUnit = (+product.pricePerSellUnit + +additionalCost).toFixed(2);
                        }

                        // if there is an end piece and it's the first iteration of the loop
                        if (product.ends > 0 && i === 0) {
                            product.pricePerSellUnit = (+product.pricePerSellUnit + this.calcEndCost(+cost, +product.width, +product.ends)).toFixed(2);
                        }

                    }

                }

            }


            // edge finish with no side options
            if (product.finishEdge && product.finishEdge.id) {
                const costs = product.finishEdge.costs;
                let cost = 0;

                for (let ca = 0; ca < costs.length; ca++) {
                    if (product.height >= +costs[ca].rangeMin && product.height <= +costs[ca].rangeMax) {
                        cost = +costs[ca].cost;
                        product.unitCostBreakdown.finishEdge = +costs[ca].cost;
                    }
                }

                let additionalCost = 0;
                if (product.finishEdge.costType === 'PLM') {
                    additionalCost = +(+cost * ((+product.length * +product.type.masonryLengthsForCalc) / 1000)).toFixed(2);
                    additionalCost = +additionalCost + +(+cost * ((+product.width * +product.type.masonryWidthsForCalc) / 1000)).toFixed(2);
                    product.pricePerSellUnit = (+product.pricePerSellUnit + +additionalCost).toFixed(2);
                } else {
                    additionalCost = +(+cost * +product.quantity).toFixed(2);
                    product.pricePerSellUnit = (+product.pricePerSellUnit + +additionalCost).toFixed(2);
                }
                product.unitCostBreakdown.finishEdge = +additionalCost;

                // if there is an end piece
                if (product.ends > 0) {
                    product.pricePerSellUnit = (+product.pricePerSellUnit + this.calcEndCost(+cost, +product.width, +product.ends)).toFixed(2);
                }

            }
            // finish edge with side options
            if (product.finishEdge && !product.finishEdge.id) {
                for (let i = 0; i < sidesArray.length; i++) {
                    // finish edge
                    if (product.finishEdge[sidesArray[i]] !== '') {
                        // isolate the right cost range
                        const costs = product.finishEdge[sidesArray[i]].costs;
                        let cost = 0;
                        for (let ca = 0; ca < costs.length; ca++) {
                            if (product.height >= +costs[ca].rangeMin && product.height <= +costs[ca].rangeMax) {
                                cost = +costs[ca].cost;
                            }
                        }

                        let additionalCost = 0;
                        if (product.finishEdge[sidesArray[i]].costType === 'PLM') {
                            if (sidesArray[i] === 'front' || sidesArray[i] === 'back') {
                                additionalCost = +(+cost * (+product.length / 1000)).toFixed(2);
                            } else {
                                additionalCost = +(+cost * (+product.width / 1000)).toFixed(2);
                            }
                            product.pricePerSellUnit = (+product.pricePerSellUnit + +additionalCost).toFixed(2);
                        } else {
                            additionalCost = +(+cost * +product.quantity).toFixed(2);
                            product.pricePerSellUnit = (+product.pricePerSellUnit + +additionalCost).toFixed(2);
                        }
                        product.unitCostBreakdown.finishEdge = +additionalCost;
                    }
                    // if there is an end piece and it's the first iteration of the loop
                    if (product.ends > 0 && i === 0) {
                        product.pricePerSellUnit = (+product.pricePerSellUnit + this.calcEndCost(+product.unitCostBreakdown.finishEdge, +product.width, +product.ends)).toFixed(2);
                    }


                }
            }

            product.unitCost = product.pricePerSellUnit;
            product.totalCost = product.unitCost * product.quantityMetres;

        }

        return product;
    }

    calcEndCost(masonryUnitCost, width, noOfEnds) {
        const endCost = +(+masonryUnitCost * ((+width / 1000) * noOfEnds)).toFixed(2);
        return +endCost;
    }

    calcCornerCost(masonryUnitCost, width, noOfCorners) {
        //
        const cornerCost = +(+masonryUnitCost * ((+width * noOfCorners) / 1000)).toFixed(2);
        return +cornerCost;
    }

    calculateSQMPricing(sku, costsSQM) {
        let pricingSet;
        let SQMPrice = 0;

        if ((sku.lengthRandom && !sku.widthRandom) || (sku.widthRandom && !sku.lengthRandom)) {
            pricingSet = costsSQM.setWidthRandom;
        }
        if (sku.lengthRandom && sku.widthRandom) {
            pricingSet = costsSQM.random;
        }
        if (!sku.lengthRandom && !sku.widthRandom) {
            pricingSet = costsSQM.setWidthSetLength;
        }

        for (let i2 = 0; i2 < pricingSet.length; i2++) {
            if (+sku.height >= +pricingSet[i2].minThickness && +sku.height <= +pricingSet[i2].maxThickness) {
                SQMPrice = pricingSet[i2].cost;
            }
        }

        if (SQMPrice === 0) {
            SQMPrice = +(2200 * (+sku.height / 1000)).toFixed(2);
        }
        return SQMPrice;
    }


}
