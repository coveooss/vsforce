// Generated from ../../syntaxes/Apex.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by ApexParser.
function ApexListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

ApexListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
ApexListener.prototype.constructor = ApexListener;

// Enter a parse tree produced by ApexParser#compilationUnit.
ApexListener.prototype.enterCompilationUnit = function(ctx) {
};

// Exit a parse tree produced by ApexParser#compilationUnit.
ApexListener.prototype.exitCompilationUnit = function(ctx) {
};


// Enter a parse tree produced by ApexParser#packageDeclaration.
ApexListener.prototype.enterPackageDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#packageDeclaration.
ApexListener.prototype.exitPackageDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#importDeclaration.
ApexListener.prototype.enterImportDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#importDeclaration.
ApexListener.prototype.exitImportDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#typeDeclaration.
ApexListener.prototype.enterTypeDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#typeDeclaration.
ApexListener.prototype.exitTypeDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#modifier.
ApexListener.prototype.enterModifier = function(ctx) {
};

// Exit a parse tree produced by ApexParser#modifier.
ApexListener.prototype.exitModifier = function(ctx) {
};


// Enter a parse tree produced by ApexParser#classOrInterfaceModifier.
ApexListener.prototype.enterClassOrInterfaceModifier = function(ctx) {
};

// Exit a parse tree produced by ApexParser#classOrInterfaceModifier.
ApexListener.prototype.exitClassOrInterfaceModifier = function(ctx) {
};


// Enter a parse tree produced by ApexParser#sharingModifier.
ApexListener.prototype.enterSharingModifier = function(ctx) {
};

// Exit a parse tree produced by ApexParser#sharingModifier.
ApexListener.prototype.exitSharingModifier = function(ctx) {
};


// Enter a parse tree produced by ApexParser#variableModifier.
ApexListener.prototype.enterVariableModifier = function(ctx) {
};

// Exit a parse tree produced by ApexParser#variableModifier.
ApexListener.prototype.exitVariableModifier = function(ctx) {
};


// Enter a parse tree produced by ApexParser#classDeclaration.
ApexListener.prototype.enterClassDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#classDeclaration.
ApexListener.prototype.exitClassDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#typeParameters.
ApexListener.prototype.enterTypeParameters = function(ctx) {
};

// Exit a parse tree produced by ApexParser#typeParameters.
ApexListener.prototype.exitTypeParameters = function(ctx) {
};


// Enter a parse tree produced by ApexParser#typeParameter.
ApexListener.prototype.enterTypeParameter = function(ctx) {
};

// Exit a parse tree produced by ApexParser#typeParameter.
ApexListener.prototype.exitTypeParameter = function(ctx) {
};


// Enter a parse tree produced by ApexParser#typeBound.
ApexListener.prototype.enterTypeBound = function(ctx) {
};

// Exit a parse tree produced by ApexParser#typeBound.
ApexListener.prototype.exitTypeBound = function(ctx) {
};


// Enter a parse tree produced by ApexParser#enumDeclaration.
ApexListener.prototype.enterEnumDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#enumDeclaration.
ApexListener.prototype.exitEnumDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#enumConstants.
ApexListener.prototype.enterEnumConstants = function(ctx) {
};

// Exit a parse tree produced by ApexParser#enumConstants.
ApexListener.prototype.exitEnumConstants = function(ctx) {
};


// Enter a parse tree produced by ApexParser#enumConstant.
ApexListener.prototype.enterEnumConstant = function(ctx) {
};

// Exit a parse tree produced by ApexParser#enumConstant.
ApexListener.prototype.exitEnumConstant = function(ctx) {
};


// Enter a parse tree produced by ApexParser#enumBodyDeclarations.
ApexListener.prototype.enterEnumBodyDeclarations = function(ctx) {
};

// Exit a parse tree produced by ApexParser#enumBodyDeclarations.
ApexListener.prototype.exitEnumBodyDeclarations = function(ctx) {
};


// Enter a parse tree produced by ApexParser#interfaceDeclaration.
ApexListener.prototype.enterInterfaceDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#interfaceDeclaration.
ApexListener.prototype.exitInterfaceDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#typeList.
ApexListener.prototype.enterTypeList = function(ctx) {
};

// Exit a parse tree produced by ApexParser#typeList.
ApexListener.prototype.exitTypeList = function(ctx) {
};


// Enter a parse tree produced by ApexParser#classBody.
ApexListener.prototype.enterClassBody = function(ctx) {
};

// Exit a parse tree produced by ApexParser#classBody.
ApexListener.prototype.exitClassBody = function(ctx) {
};


// Enter a parse tree produced by ApexParser#interfaceBody.
ApexListener.prototype.enterInterfaceBody = function(ctx) {
};

// Exit a parse tree produced by ApexParser#interfaceBody.
ApexListener.prototype.exitInterfaceBody = function(ctx) {
};


// Enter a parse tree produced by ApexParser#classBodyDeclaration.
ApexListener.prototype.enterClassBodyDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#classBodyDeclaration.
ApexListener.prototype.exitClassBodyDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#memberDeclaration.
ApexListener.prototype.enterMemberDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#memberDeclaration.
ApexListener.prototype.exitMemberDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#methodDeclaration.
ApexListener.prototype.enterMethodDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#methodDeclaration.
ApexListener.prototype.exitMethodDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#genericMethodDeclaration.
ApexListener.prototype.enterGenericMethodDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#genericMethodDeclaration.
ApexListener.prototype.exitGenericMethodDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#constructorDeclaration.
ApexListener.prototype.enterConstructorDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#constructorDeclaration.
ApexListener.prototype.exitConstructorDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#genericConstructorDeclaration.
ApexListener.prototype.enterGenericConstructorDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#genericConstructorDeclaration.
ApexListener.prototype.exitGenericConstructorDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#fieldDeclaration.
ApexListener.prototype.enterFieldDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#fieldDeclaration.
ApexListener.prototype.exitFieldDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#propertyDeclaration.
ApexListener.prototype.enterPropertyDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#propertyDeclaration.
ApexListener.prototype.exitPropertyDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#propertyBodyDeclaration.
ApexListener.prototype.enterPropertyBodyDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#propertyBodyDeclaration.
ApexListener.prototype.exitPropertyBodyDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#interfaceBodyDeclaration.
ApexListener.prototype.enterInterfaceBodyDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#interfaceBodyDeclaration.
ApexListener.prototype.exitInterfaceBodyDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#interfaceMemberDeclaration.
ApexListener.prototype.enterInterfaceMemberDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#interfaceMemberDeclaration.
ApexListener.prototype.exitInterfaceMemberDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#constDeclaration.
ApexListener.prototype.enterConstDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#constDeclaration.
ApexListener.prototype.exitConstDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#constantDeclarator.
ApexListener.prototype.enterConstantDeclarator = function(ctx) {
};

// Exit a parse tree produced by ApexParser#constantDeclarator.
ApexListener.prototype.exitConstantDeclarator = function(ctx) {
};


// Enter a parse tree produced by ApexParser#interfaceMethodDeclaration.
ApexListener.prototype.enterInterfaceMethodDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#interfaceMethodDeclaration.
ApexListener.prototype.exitInterfaceMethodDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#genericInterfaceMethodDeclaration.
ApexListener.prototype.enterGenericInterfaceMethodDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#genericInterfaceMethodDeclaration.
ApexListener.prototype.exitGenericInterfaceMethodDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#variableDeclarators.
ApexListener.prototype.enterVariableDeclarators = function(ctx) {
};

// Exit a parse tree produced by ApexParser#variableDeclarators.
ApexListener.prototype.exitVariableDeclarators = function(ctx) {
};


// Enter a parse tree produced by ApexParser#variableDeclarator.
ApexListener.prototype.enterVariableDeclarator = function(ctx) {
};

// Exit a parse tree produced by ApexParser#variableDeclarator.
ApexListener.prototype.exitVariableDeclarator = function(ctx) {
};


// Enter a parse tree produced by ApexParser#variableDeclaratorId.
ApexListener.prototype.enterVariableDeclaratorId = function(ctx) {
};

// Exit a parse tree produced by ApexParser#variableDeclaratorId.
ApexListener.prototype.exitVariableDeclaratorId = function(ctx) {
};


// Enter a parse tree produced by ApexParser#variableInitializer.
ApexListener.prototype.enterVariableInitializer = function(ctx) {
};

// Exit a parse tree produced by ApexParser#variableInitializer.
ApexListener.prototype.exitVariableInitializer = function(ctx) {
};


// Enter a parse tree produced by ApexParser#arrayInitializer.
ApexListener.prototype.enterArrayInitializer = function(ctx) {
};

// Exit a parse tree produced by ApexParser#arrayInitializer.
ApexListener.prototype.exitArrayInitializer = function(ctx) {
};


// Enter a parse tree produced by ApexParser#enumConstantName.
ApexListener.prototype.enterEnumConstantName = function(ctx) {
};

// Exit a parse tree produced by ApexParser#enumConstantName.
ApexListener.prototype.exitEnumConstantName = function(ctx) {
};


// Enter a parse tree produced by ApexParser#type.
ApexListener.prototype.enterType = function(ctx) {
};

// Exit a parse tree produced by ApexParser#type.
ApexListener.prototype.exitType = function(ctx) {
};


// Enter a parse tree produced by ApexParser#classOrInterfaceType.
ApexListener.prototype.enterClassOrInterfaceType = function(ctx) {
};

// Exit a parse tree produced by ApexParser#classOrInterfaceType.
ApexListener.prototype.exitClassOrInterfaceType = function(ctx) {
};


// Enter a parse tree produced by ApexParser#primitiveType.
ApexListener.prototype.enterPrimitiveType = function(ctx) {
};

// Exit a parse tree produced by ApexParser#primitiveType.
ApexListener.prototype.exitPrimitiveType = function(ctx) {
};


// Enter a parse tree produced by ApexParser#typeArguments.
ApexListener.prototype.enterTypeArguments = function(ctx) {
};

// Exit a parse tree produced by ApexParser#typeArguments.
ApexListener.prototype.exitTypeArguments = function(ctx) {
};


// Enter a parse tree produced by ApexParser#typeArgument.
ApexListener.prototype.enterTypeArgument = function(ctx) {
};

// Exit a parse tree produced by ApexParser#typeArgument.
ApexListener.prototype.exitTypeArgument = function(ctx) {
};


// Enter a parse tree produced by ApexParser#qualifiedNameList.
ApexListener.prototype.enterQualifiedNameList = function(ctx) {
};

// Exit a parse tree produced by ApexParser#qualifiedNameList.
ApexListener.prototype.exitQualifiedNameList = function(ctx) {
};


// Enter a parse tree produced by ApexParser#formalParameters.
ApexListener.prototype.enterFormalParameters = function(ctx) {
};

// Exit a parse tree produced by ApexParser#formalParameters.
ApexListener.prototype.exitFormalParameters = function(ctx) {
};


// Enter a parse tree produced by ApexParser#formalParameterList.
ApexListener.prototype.enterFormalParameterList = function(ctx) {
};

// Exit a parse tree produced by ApexParser#formalParameterList.
ApexListener.prototype.exitFormalParameterList = function(ctx) {
};


// Enter a parse tree produced by ApexParser#formalParameter.
ApexListener.prototype.enterFormalParameter = function(ctx) {
};

// Exit a parse tree produced by ApexParser#formalParameter.
ApexListener.prototype.exitFormalParameter = function(ctx) {
};


// Enter a parse tree produced by ApexParser#lastFormalParameter.
ApexListener.prototype.enterLastFormalParameter = function(ctx) {
};

// Exit a parse tree produced by ApexParser#lastFormalParameter.
ApexListener.prototype.exitLastFormalParameter = function(ctx) {
};


// Enter a parse tree produced by ApexParser#methodBody.
ApexListener.prototype.enterMethodBody = function(ctx) {
};

// Exit a parse tree produced by ApexParser#methodBody.
ApexListener.prototype.exitMethodBody = function(ctx) {
};


// Enter a parse tree produced by ApexParser#constructorBody.
ApexListener.prototype.enterConstructorBody = function(ctx) {
};

// Exit a parse tree produced by ApexParser#constructorBody.
ApexListener.prototype.exitConstructorBody = function(ctx) {
};


// Enter a parse tree produced by ApexParser#qualifiedName.
ApexListener.prototype.enterQualifiedName = function(ctx) {
};

// Exit a parse tree produced by ApexParser#qualifiedName.
ApexListener.prototype.exitQualifiedName = function(ctx) {
};


// Enter a parse tree produced by ApexParser#literal.
ApexListener.prototype.enterLiteral = function(ctx) {
};

// Exit a parse tree produced by ApexParser#literal.
ApexListener.prototype.exitLiteral = function(ctx) {
};


// Enter a parse tree produced by ApexParser#annotation.
ApexListener.prototype.enterAnnotation = function(ctx) {
};

// Exit a parse tree produced by ApexParser#annotation.
ApexListener.prototype.exitAnnotation = function(ctx) {
};


// Enter a parse tree produced by ApexParser#annotationName.
ApexListener.prototype.enterAnnotationName = function(ctx) {
};

// Exit a parse tree produced by ApexParser#annotationName.
ApexListener.prototype.exitAnnotationName = function(ctx) {
};


// Enter a parse tree produced by ApexParser#elementValuePairs.
ApexListener.prototype.enterElementValuePairs = function(ctx) {
};

// Exit a parse tree produced by ApexParser#elementValuePairs.
ApexListener.prototype.exitElementValuePairs = function(ctx) {
};


// Enter a parse tree produced by ApexParser#elementValuePair.
ApexListener.prototype.enterElementValuePair = function(ctx) {
};

// Exit a parse tree produced by ApexParser#elementValuePair.
ApexListener.prototype.exitElementValuePair = function(ctx) {
};


// Enter a parse tree produced by ApexParser#elementValue.
ApexListener.prototype.enterElementValue = function(ctx) {
};

// Exit a parse tree produced by ApexParser#elementValue.
ApexListener.prototype.exitElementValue = function(ctx) {
};


// Enter a parse tree produced by ApexParser#elementValueArrayInitializer.
ApexListener.prototype.enterElementValueArrayInitializer = function(ctx) {
};

// Exit a parse tree produced by ApexParser#elementValueArrayInitializer.
ApexListener.prototype.exitElementValueArrayInitializer = function(ctx) {
};


// Enter a parse tree produced by ApexParser#annotationTypeDeclaration.
ApexListener.prototype.enterAnnotationTypeDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#annotationTypeDeclaration.
ApexListener.prototype.exitAnnotationTypeDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#annotationTypeBody.
ApexListener.prototype.enterAnnotationTypeBody = function(ctx) {
};

// Exit a parse tree produced by ApexParser#annotationTypeBody.
ApexListener.prototype.exitAnnotationTypeBody = function(ctx) {
};


// Enter a parse tree produced by ApexParser#annotationTypeElementDeclaration.
ApexListener.prototype.enterAnnotationTypeElementDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#annotationTypeElementDeclaration.
ApexListener.prototype.exitAnnotationTypeElementDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#annotationTypeElementRest.
ApexListener.prototype.enterAnnotationTypeElementRest = function(ctx) {
};

// Exit a parse tree produced by ApexParser#annotationTypeElementRest.
ApexListener.prototype.exitAnnotationTypeElementRest = function(ctx) {
};


// Enter a parse tree produced by ApexParser#annotationMethodOrConstantRest.
ApexListener.prototype.enterAnnotationMethodOrConstantRest = function(ctx) {
};

// Exit a parse tree produced by ApexParser#annotationMethodOrConstantRest.
ApexListener.prototype.exitAnnotationMethodOrConstantRest = function(ctx) {
};


// Enter a parse tree produced by ApexParser#annotationMethodRest.
ApexListener.prototype.enterAnnotationMethodRest = function(ctx) {
};

// Exit a parse tree produced by ApexParser#annotationMethodRest.
ApexListener.prototype.exitAnnotationMethodRest = function(ctx) {
};


// Enter a parse tree produced by ApexParser#annotationConstantRest.
ApexListener.prototype.enterAnnotationConstantRest = function(ctx) {
};

// Exit a parse tree produced by ApexParser#annotationConstantRest.
ApexListener.prototype.exitAnnotationConstantRest = function(ctx) {
};


// Enter a parse tree produced by ApexParser#defaultValue.
ApexListener.prototype.enterDefaultValue = function(ctx) {
};

// Exit a parse tree produced by ApexParser#defaultValue.
ApexListener.prototype.exitDefaultValue = function(ctx) {
};


// Enter a parse tree produced by ApexParser#block.
ApexListener.prototype.enterBlock = function(ctx) {
};

// Exit a parse tree produced by ApexParser#block.
ApexListener.prototype.exitBlock = function(ctx) {
};


// Enter a parse tree produced by ApexParser#blockStatement.
ApexListener.prototype.enterBlockStatement = function(ctx) {
};

// Exit a parse tree produced by ApexParser#blockStatement.
ApexListener.prototype.exitBlockStatement = function(ctx) {
};


// Enter a parse tree produced by ApexParser#localVariableDeclarationStatement.
ApexListener.prototype.enterLocalVariableDeclarationStatement = function(ctx) {
};

// Exit a parse tree produced by ApexParser#localVariableDeclarationStatement.
ApexListener.prototype.exitLocalVariableDeclarationStatement = function(ctx) {
};


// Enter a parse tree produced by ApexParser#localVariableDeclaration.
ApexListener.prototype.enterLocalVariableDeclaration = function(ctx) {
};

// Exit a parse tree produced by ApexParser#localVariableDeclaration.
ApexListener.prototype.exitLocalVariableDeclaration = function(ctx) {
};


// Enter a parse tree produced by ApexParser#statement.
ApexListener.prototype.enterStatement = function(ctx) {
};

// Exit a parse tree produced by ApexParser#statement.
ApexListener.prototype.exitStatement = function(ctx) {
};


// Enter a parse tree produced by ApexParser#propertyBlock.
ApexListener.prototype.enterPropertyBlock = function(ctx) {
};

// Exit a parse tree produced by ApexParser#propertyBlock.
ApexListener.prototype.exitPropertyBlock = function(ctx) {
};


// Enter a parse tree produced by ApexParser#getter.
ApexListener.prototype.enterGetter = function(ctx) {
};

// Exit a parse tree produced by ApexParser#getter.
ApexListener.prototype.exitGetter = function(ctx) {
};


// Enter a parse tree produced by ApexParser#setter.
ApexListener.prototype.enterSetter = function(ctx) {
};

// Exit a parse tree produced by ApexParser#setter.
ApexListener.prototype.exitSetter = function(ctx) {
};


// Enter a parse tree produced by ApexParser#catchClause.
ApexListener.prototype.enterCatchClause = function(ctx) {
};

// Exit a parse tree produced by ApexParser#catchClause.
ApexListener.prototype.exitCatchClause = function(ctx) {
};


// Enter a parse tree produced by ApexParser#catchType.
ApexListener.prototype.enterCatchType = function(ctx) {
};

// Exit a parse tree produced by ApexParser#catchType.
ApexListener.prototype.exitCatchType = function(ctx) {
};


// Enter a parse tree produced by ApexParser#finallyBlock.
ApexListener.prototype.enterFinallyBlock = function(ctx) {
};

// Exit a parse tree produced by ApexParser#finallyBlock.
ApexListener.prototype.exitFinallyBlock = function(ctx) {
};


// Enter a parse tree produced by ApexParser#resourceSpecification.
ApexListener.prototype.enterResourceSpecification = function(ctx) {
};

// Exit a parse tree produced by ApexParser#resourceSpecification.
ApexListener.prototype.exitResourceSpecification = function(ctx) {
};


// Enter a parse tree produced by ApexParser#resources.
ApexListener.prototype.enterResources = function(ctx) {
};

// Exit a parse tree produced by ApexParser#resources.
ApexListener.prototype.exitResources = function(ctx) {
};


// Enter a parse tree produced by ApexParser#resource.
ApexListener.prototype.enterResource = function(ctx) {
};

// Exit a parse tree produced by ApexParser#resource.
ApexListener.prototype.exitResource = function(ctx) {
};


// Enter a parse tree produced by ApexParser#forControl.
ApexListener.prototype.enterForControl = function(ctx) {
};

// Exit a parse tree produced by ApexParser#forControl.
ApexListener.prototype.exitForControl = function(ctx) {
};


// Enter a parse tree produced by ApexParser#forInit.
ApexListener.prototype.enterForInit = function(ctx) {
};

// Exit a parse tree produced by ApexParser#forInit.
ApexListener.prototype.exitForInit = function(ctx) {
};


// Enter a parse tree produced by ApexParser#enhancedForControl.
ApexListener.prototype.enterEnhancedForControl = function(ctx) {
};

// Exit a parse tree produced by ApexParser#enhancedForControl.
ApexListener.prototype.exitEnhancedForControl = function(ctx) {
};


// Enter a parse tree produced by ApexParser#forUpdate.
ApexListener.prototype.enterForUpdate = function(ctx) {
};

// Exit a parse tree produced by ApexParser#forUpdate.
ApexListener.prototype.exitForUpdate = function(ctx) {
};


// Enter a parse tree produced by ApexParser#db_shortcut_expression.
ApexListener.prototype.enterDb_shortcut_expression = function(ctx) {
};

// Exit a parse tree produced by ApexParser#db_shortcut_expression.
ApexListener.prototype.exitDb_shortcut_expression = function(ctx) {
};


// Enter a parse tree produced by ApexParser#parExpression.
ApexListener.prototype.enterParExpression = function(ctx) {
};

// Exit a parse tree produced by ApexParser#parExpression.
ApexListener.prototype.exitParExpression = function(ctx) {
};


// Enter a parse tree produced by ApexParser#expressionList.
ApexListener.prototype.enterExpressionList = function(ctx) {
};

// Exit a parse tree produced by ApexParser#expressionList.
ApexListener.prototype.exitExpressionList = function(ctx) {
};


// Enter a parse tree produced by ApexParser#statementExpression.
ApexListener.prototype.enterStatementExpression = function(ctx) {
};

// Exit a parse tree produced by ApexParser#statementExpression.
ApexListener.prototype.exitStatementExpression = function(ctx) {
};


// Enter a parse tree produced by ApexParser#constantExpression.
ApexListener.prototype.enterConstantExpression = function(ctx) {
};

// Exit a parse tree produced by ApexParser#constantExpression.
ApexListener.prototype.exitConstantExpression = function(ctx) {
};


// Enter a parse tree produced by ApexParser#expression.
ApexListener.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by ApexParser#expression.
ApexListener.prototype.exitExpression = function(ctx) {
};


// Enter a parse tree produced by ApexParser#primary.
ApexListener.prototype.enterPrimary = function(ctx) {
};

// Exit a parse tree produced by ApexParser#primary.
ApexListener.prototype.exitPrimary = function(ctx) {
};


// Enter a parse tree produced by ApexParser#creator.
ApexListener.prototype.enterCreator = function(ctx) {
};

// Exit a parse tree produced by ApexParser#creator.
ApexListener.prototype.exitCreator = function(ctx) {
};


// Enter a parse tree produced by ApexParser#createdName.
ApexListener.prototype.enterCreatedName = function(ctx) {
};

// Exit a parse tree produced by ApexParser#createdName.
ApexListener.prototype.exitCreatedName = function(ctx) {
};


// Enter a parse tree produced by ApexParser#innerCreator.
ApexListener.prototype.enterInnerCreator = function(ctx) {
};

// Exit a parse tree produced by ApexParser#innerCreator.
ApexListener.prototype.exitInnerCreator = function(ctx) {
};


// Enter a parse tree produced by ApexParser#arrayCreatorRest.
ApexListener.prototype.enterArrayCreatorRest = function(ctx) {
};

// Exit a parse tree produced by ApexParser#arrayCreatorRest.
ApexListener.prototype.exitArrayCreatorRest = function(ctx) {
};


// Enter a parse tree produced by ApexParser#mapCreatorRest.
ApexListener.prototype.enterMapCreatorRest = function(ctx) {
};

// Exit a parse tree produced by ApexParser#mapCreatorRest.
ApexListener.prototype.exitMapCreatorRest = function(ctx) {
};


// Enter a parse tree produced by ApexParser#setCreatorRest.
ApexListener.prototype.enterSetCreatorRest = function(ctx) {
};

// Exit a parse tree produced by ApexParser#setCreatorRest.
ApexListener.prototype.exitSetCreatorRest = function(ctx) {
};


// Enter a parse tree produced by ApexParser#classCreatorRest.
ApexListener.prototype.enterClassCreatorRest = function(ctx) {
};

// Exit a parse tree produced by ApexParser#classCreatorRest.
ApexListener.prototype.exitClassCreatorRest = function(ctx) {
};


// Enter a parse tree produced by ApexParser#explicitGenericInvocation.
ApexListener.prototype.enterExplicitGenericInvocation = function(ctx) {
};

// Exit a parse tree produced by ApexParser#explicitGenericInvocation.
ApexListener.prototype.exitExplicitGenericInvocation = function(ctx) {
};


// Enter a parse tree produced by ApexParser#nonWildcardTypeArguments.
ApexListener.prototype.enterNonWildcardTypeArguments = function(ctx) {
};

// Exit a parse tree produced by ApexParser#nonWildcardTypeArguments.
ApexListener.prototype.exitNonWildcardTypeArguments = function(ctx) {
};


// Enter a parse tree produced by ApexParser#typeArgumentsOrDiamond.
ApexListener.prototype.enterTypeArgumentsOrDiamond = function(ctx) {
};

// Exit a parse tree produced by ApexParser#typeArgumentsOrDiamond.
ApexListener.prototype.exitTypeArgumentsOrDiamond = function(ctx) {
};


// Enter a parse tree produced by ApexParser#nonWildcardTypeArgumentsOrDiamond.
ApexListener.prototype.enterNonWildcardTypeArgumentsOrDiamond = function(ctx) {
};

// Exit a parse tree produced by ApexParser#nonWildcardTypeArgumentsOrDiamond.
ApexListener.prototype.exitNonWildcardTypeArgumentsOrDiamond = function(ctx) {
};


// Enter a parse tree produced by ApexParser#superSuffix.
ApexListener.prototype.enterSuperSuffix = function(ctx) {
};

// Exit a parse tree produced by ApexParser#superSuffix.
ApexListener.prototype.exitSuperSuffix = function(ctx) {
};


// Enter a parse tree produced by ApexParser#explicitGenericInvocationSuffix.
ApexListener.prototype.enterExplicitGenericInvocationSuffix = function(ctx) {
};

// Exit a parse tree produced by ApexParser#explicitGenericInvocationSuffix.
ApexListener.prototype.exitExplicitGenericInvocationSuffix = function(ctx) {
};


// Enter a parse tree produced by ApexParser#arguments.
ApexListener.prototype.enterArguments = function(ctx) {
};

// Exit a parse tree produced by ApexParser#arguments.
ApexListener.prototype.exitArguments = function(ctx) {
};



exports.ApexListener = ApexListener;