"use strict";

const {js2sql} = require("../lib/index");
const assert = require("assert");

describe("js2sql", () => {
    
    it("arrow function to sql", () => {
        
        let sql;
        
        sql = js2sql(() => true); 
        assert.deepEqual(sql, [
            {literal: true}
        ]);

        sql = js2sql(() => {return true;}); 
        assert.deepEqual(sql, [
            {literal: true}
        ]);

    });
        
    it("function to sql", () => {
        
        let sql;
        
        sql = js2sql(function() {
            return true;
        });
        assert.deepEqual(sql, [
            {literal: true}
        ]);

        sql = js2sql(function some() {
            return true;
        }); 
        assert.deepEqual(sql, [
            {literal: true}
        ]);

    });

    it("first argument as string", () => {
        let sql;
        
        sql = js2sql(`function() {
            return true;
        }`);
        assert.deepEqual(sql, [
            {literal: true}
        ]);

        sql = js2sql("() => true"); 
        assert.deepEqual(sql, [
            {literal: true}
        ]);
    });

    it("ignore first spaces", () => {
        let sql;
        
        sql = js2sql(`   function() {
            return true;
        }`);
        assert.deepEqual(sql, [
            {literal: true}
        ]);
    });

    it("ignore comments", () => {
        let sql;

        // multi line comments
        sql = js2sql(() => 
            /* hello */
            true
        ); 

        assert.deepEqual(sql, [
            {literal: true}
        ]);

        // line comments
        sql = js2sql(() => 
            // some 
            true // comment
        ); 

        assert.deepEqual(sql, [
            {literal: true}
        ]);

    });

    it("ignore first comment", () => {
        let sql;

        // multi line comments
        sql = js2sql(`/* hello */() => 
            true
        `); 

        assert.deepEqual(sql, [
            {literal: true}
        ]);
    });

});