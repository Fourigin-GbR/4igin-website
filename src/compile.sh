#!/usr/bin/env bash

compile()
{
    inputpath=$1
    outputfile=$2

   INFILE=files.txt
   files=()

    for i in $(cat $INFILE) ; do
       files+=("$i")
    done

	filesin=""

	echo "--------------------------------------------------------------------------------------------"
	echo "compiling files in "${inputpath}" to "${outputfile}
	echo "--------------------------------------------------------------------------------------------"
	for i in "${files[@]}"
	do
		filesin=${filesin}"--js="${inputpath}${i}" "
		echo "compiling "${i}
	done
	java -jar compiler.jar ${filesin} --jscomp_warning=checkTypes --create_source_map ./source-maps/${outputfile}.map --source_map_format=V3 --compilation_level SIMPLE_OPTIMIZATIONS --js_output_file=${outputfile}

	echo ""
	echo ""
	echo -e "\e[35m ####   ####  #    # #####  #      ###### ##### ###### "
	echo -e "\e[35m#    # #    # ##  ## #    # #      #        #   #      "
	echo -e "\e[35m#      #    # # ## # #    # #      #####    #   #####  "
	echo -e "\e[35m#      #    # #    # #####  #      #        #   #      "
	echo -e "\e[35m#    # #    # #    # #      #      #        #   #      "
	echo -e "\e[35m ####   ####  #    # #      ###### ######   #   ###### "
}

compileJs()
{
	inputpath="../view/js/"
	outputfile="../view/js/scripts.min.js"

	compile ${inputpath} ${outputfile}
}


### compile every 20 sec...
#while true; do
#    sleep 20
#    compileJs
#done

compileJs

exit 0
